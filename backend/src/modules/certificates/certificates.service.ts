// @ts-nocheck
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as PDFDocument from "pdfkit";
import * as dayjs from "dayjs";

// Critères pour obtenir le certificat
const CERTIFICATION_CRITERIA = {
  minExamsPassed: 3,
  minExamScore: 80,
  minCoursesCompleted: 100,
  minVideosWatched: 80,
};

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  // Vérifier si l'élève remplit les critères
  async checkEligibility(userId: string) {
    const [
      totalLessons,
      completedLessons,
      totalVideos,
      watchedVideos,
      examAttempts,
    ] = await Promise.all([
      this.prisma.lesson.count({ where: { isPublished: true } }),
      this.prisma.lessonProgress.count({
        where: { userId, isCompleted: true },
      }),
      this.prisma.video.count({ where: { isPublished: true } }),
      this.prisma.videoProgress.count({
        where: { userId, isCompleted: true },
      }),
      this.prisma.examAttempt.findMany({
        where: { userId, passed: true },
        orderBy: { score: "desc" },
      }),
    ]);

    const coursesProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    const videosProgress =
      totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0;

    const passedExams = examAttempts.filter((e) => e.passed);
    const averageExamScore =
      passedExams.length > 0
        ? Math.round(
            passedExams.reduce(
              (sum, e) => sum + (e.score / e.totalQuestions) * 100,
              0
            ) / passedExams.length
          )
        : 0;

    const criteria = {
      coursesCompleted: {
        current: coursesProgress,
        required: CERTIFICATION_CRITERIA.minCoursesCompleted,
        met: coursesProgress >= CERTIFICATION_CRITERIA.minCoursesCompleted,
        label: "Cours complétés",
      },
      videosWatched: {
        current: videosProgress,
        required: CERTIFICATION_CRITERIA.minVideosWatched,
        met: videosProgress >= CERTIFICATION_CRITERIA.minVideosWatched,
        label: "Vidéos regardées",
      },
      examsPassed: {
        current: passedExams.length,
        required: CERTIFICATION_CRITERIA.minExamsPassed,
        met: passedExams.length >= CERTIFICATION_CRITERIA.minExamsPassed,
        label: "Examens blancs réussis (≥70%)",
      },
      averageScore: {
        current: averageExamScore,
        required: CERTIFICATION_CRITERIA.minExamScore,
        met: averageExamScore >= CERTIFICATION_CRITERIA.minExamScore,
        label: "Score moyen aux examens",
      },
    };

    const isEligible = Object.values(criteria).every((c) => c.met);

    return {
      isEligible,
      criteria,
      message: isEligible
        ? "Félicitations ! Vous remplissez tous les critères pour obtenir votre certificat."
        : "Vous ne remplissez pas encore tous les critères. Continuez votre formation !",
    };
  }

  // Générer le certificat
  async generateCertificate(userId: string) {
    const eligibility = await this.checkEligibility(userId);
    if (!eligibility.isEligible) {
      throw new BadRequestException(
        "Vous ne remplissez pas encore les critères pour le certificat."
      );
    }

    // Vérifier s'il n'a pas déjà un certificat valide
    const existingCert = await this.prisma.certificate.findFirst({
      where: { userId, expiresAt: { gte: new Date() } },
    });

    if (existingCert) {
      return {
        certificate: existingCert,
        message: "Vous avez déjà un certificat valide.",
      };
    }

    // Récupérer les stats
    const examAttempts = await this.prisma.examAttempt.findMany({
      where: { userId, passed: true },
    });

    const averageScore =
      examAttempts.length > 0
        ? examAttempts.reduce(
            (sum, e) => sum + (e.score / e.totalQuestions) * 100,
            0
          ) / examAttempts.length
        : 0;

    // Générer un numéro unique
    const year = new Date().getFullYear();
    const count = await this.prisma.certificate.count();
    const certificateRef = `CRCM-${year}-${String(count + 1).padStart(5, "0")}`;

    // Valide 1 an
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const certificate = await this.prisma.certificate.create({
      data: {
        userId,
        certificateRef,
        expiresAt,
        coursesCompleted: true,
        videosCompleted: true,
        examsPassedCount: examAttempts.length,
        averageExamScore: Math.round(averageScore),
      },
    });

    return {
      certificate,
      message:
        "Votre certificat a été généré ! Vous pouvez le télécharger en PDF et vous inscrire à l'examen.",
    };
  }

  // Générer le PDF du certificat
  async generatePDF(userId: string): Promise<Buffer> {
    const certificate = await this.prisma.certificate.findFirst({
      where: { userId },
      orderBy: { issuedAt: "desc" },
      include: {
        user: true,
      },
    });

    if (!certificate) {
      throw new NotFoundException(
        "Aucun certificat trouvé. Veuillez d'abord valider les critères."
      );
    }

    const user = certificate.user;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: { top: 50, bottom: 50, left: 60, right: 60 },
      });

      const buffers: Buffer[] = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // === DESIGN DU CERTIFICAT ===

      // Bordure décorative
      doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke("#2563eb");

      doc
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .lineWidth(1)
        .stroke("#93c5fd");

      // En-tête
      doc
        .fontSize(14)
        .fillColor("#6b7280")
        .text("RÉPUBLIQUE DU CAMEROUN", 0, 60, { align: "center" })
        .fontSize(11)
        .text("Paix - Travail - Patrie", { align: "center" });

      doc.moveDown(1.5);

      // Titre principal
      doc
        .fontSize(32)
        .fillColor("#1e40af")
        .font("Helvetica-Bold")
        .text("CERTIFICAT DE FORMATION", { align: "center" });

      doc
        .fontSize(16)
        .fillColor("#2563eb")
        .text("Code de la Route", { align: "center" });

      doc.moveDown(1.5);

      // Corps du certificat
      doc
        .fontSize(13)
        .fillColor("#374151")
        .font("Helvetica")
        .text("Ce certificat atteste que", { align: "center" });

      doc.moveDown(0.5);

      doc
        .fontSize(24)
        .fillColor("#111827")
        .font("Helvetica-Bold")
        .text(`${user.firstName} ${user.lastName}`, { align: "center" });

      doc.moveDown(0.5);

      doc
        .fontSize(13)
        .fillColor("#374151")
        .font("Helvetica")
        .text(
          "a suivi avec succès la formation au code de la route et a démontré",
          { align: "center" }
        )
        .text("les connaissances nécessaires pour se présenter à l'examen théorique.", {
          align: "center",
        });

      doc.moveDown(1.5);

      // Performances
      const perfY = doc.y;
      const colWidth = 180;
      const startX = (doc.page.width - colWidth * 3) / 2;

      // Examens réussis
      doc
        .fontSize(22)
        .fillColor("#2563eb")
        .font("Helvetica-Bold")
        .text(`${certificate.examsPassedCount}`, startX, perfY, {
          width: colWidth,
          align: "center",
        });
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text("Examens réussis", startX, perfY + 28, {
          width: colWidth,
          align: "center",
        });

      // Score moyen
      doc
        .fontSize(22)
        .fillColor("#2563eb")
        .font("Helvetica-Bold")
        .text(`${certificate.averageExamScore}%`, startX + colWidth, perfY, {
          width: colWidth,
          align: "center",
        });
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text("Score moyen", startX + colWidth, perfY + 28, {
          width: colWidth,
          align: "center",
        });

      // Catégorie
      doc
        .fontSize(22)
        .fillColor("#2563eb")
        .font("Helvetica-Bold")
        .text(user.permitCategory, startX + colWidth * 2, perfY, {
          width: colWidth,
          align: "center",
        });
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text("Catégorie de permis", startX + colWidth * 2, perfY + 28, {
          width: colWidth,
          align: "center",
        });

      doc.moveDown(4);

      // Dates et référence
      const footerY = doc.page.height - 130;

      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .font("Helvetica")
        .text(
          `Délivré le : ${dayjs(certificate.issuedAt).format("DD/MM/YYYY")}`,
          80,
          footerY
        )
        .text(
          `Valide jusqu'au : ${dayjs(certificate.expiresAt).format("DD/MM/YYYY")}`,
          80,
          footerY + 16
        )
        .text(`N° : ${certificate.certificateRef}`, 80, footerY + 32);

      // Ville
      doc
        .fontSize(10)
        .text(
          `Ville : ${user.city || "Non spécifiée"}`,
          80,
          footerY + 48
        );

      // Signature
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text("Le Directeur de la Formation", doc.page.width - 280, footerY, {
          width: 200,
          align: "center",
        })
        .moveDown(2)
        .text("Code Route Cameroun", doc.page.width - 280, footerY + 40, {
          width: 200,
          align: "center",
        });

      // QR Code placeholder (vérification en ligne)
      doc
        .fontSize(8)
        .fillColor("#9ca3af")
        .text(
          `Vérification en ligne : coderoute.cm/verify/${certificate.certificateRef}`,
          0,
          doc.page.height - 60,
          { align: "center" }
        );

      doc.end();
    });
  }

  // Récupérer le certificat
  async getCertificate(userId: string) {
    const certificate = await this.prisma.certificate.findFirst({
      where: { userId },
      orderBy: { issuedAt: "desc" },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            city: true,
            permitCategory: true,
          },
        },
      },
    });

    if (!certificate) return null;

    return {
      ...certificate,
      isValid: certificate.expiresAt > new Date(),
    };
  }

  // Vérifier un certificat par référence (endpoint public pour auto-écoles)
  async verifyCertificate(certificateRef: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { certificateRef },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            city: true,
            permitCategory: true,
            phone: true,
          },
        },
      },
    });

    if (!certificate) {
      throw new NotFoundException("Certificat non trouvé ou référence invalide");
    }

    return {
      isValid: certificate.expiresAt > new Date(),
      certificate: {
        ref: certificate.certificateRef,
        issuedAt: certificate.issuedAt,
        expiresAt: certificate.expiresAt,
        examsPassedCount: certificate.examsPassedCount,
        averageExamScore: certificate.averageExamScore,
      },
      student: certificate.user,
    };
  }
}
