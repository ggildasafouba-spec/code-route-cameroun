import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AutoEcolesService {
  constructor(private prisma: PrismaService) {}

  // Liste des auto-écoles partenaires (visible par les élèves)
  async getPartners(city?: string) {
    const where: any = { isPartner: true, isVerified: true };
    if (city) where.city = city;

    return this.prisma.autoEcole.findMany({
      where,
      select: {
        id: true,
        name: true,
        city: true,
        address: true,
        phone: true,
        description: true,
        logo: true,
        rating: true,
        totalStudents: true,
        examPrice: true,
      },
      orderBy: { rating: "desc" },
    });
  }

  // Élève choisit une auto-école pour l'examen
  async enrollInAutoEcole(userId: string, autoEcoleId: string) {
    // Vérifier que l'élève est prêt (certificat délivré)
    const certificate = await this.prisma.certificate.findFirst({
      where: { userId },
      orderBy: { issuedAt: "desc" },
    });

    if (!certificate) {
      throw new BadRequestException(
        "Vous devez d'abord obtenir votre certificat de formation pour vous inscrire à l'examen."
      );
    }

    // Vérifier que l'auto-école existe et est partenaire
    const autoEcole = await this.prisma.autoEcole.findUnique({
      where: { id: autoEcoleId },
    });

    if (!autoEcole || !autoEcole.isPartner) {
      throw new NotFoundException("Auto-école partenaire non trouvée");
    }

    // Vérifier si l'élève n'est pas déjà inscrit
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: { userId },
    });

    if (existingEnrollment) {
      throw new BadRequestException(
        "Vous êtes déjà inscrit dans une auto-école"
      );
    }

    // Créer l'inscription
    const enrollment = await this.prisma.enrollment.create({
      data: {
        userId,
        autoEcoleId,
      },
    });

    // Créer le referral (commission à tracker)
    await this.prisma.referral.create({
      data: {
        userId,
        autoEcoleId,
        commissionAmount: autoEcole.commissionRate,
        status: "PENDING",
      },
    });

    // Incrémenter le nombre d'élèves de l'auto-école
    await this.prisma.autoEcole.update({
      where: { id: autoEcoleId },
      data: { totalStudents: { increment: 1 } },
    });

    return {
      enrollment,
      autoEcole: {
        name: autoEcole.name,
        city: autoEcole.city,
        phone: autoEcole.phone,
      },
      message: `Inscription confirmée chez ${autoEcole.name}. Ils vous contacteront pour fixer la date d'examen.`,
    };
  }

  // Dashboard admin : voir les commissions
  async getCommissions(status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const referrals = await this.prisma.referral.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, phone: true } },
        autoEcole: { select: { name: true, city: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const totalPending = referrals
      .filter((r) => r.status === "PENDING" || r.status === "CONFIRMED")
      .reduce((sum, r) => sum + r.commissionAmount, 0);

    const totalPaid = referrals
      .filter((r) => r.status === "PAID")
      .reduce((sum, r) => sum + r.commissionAmount, 0);

    return {
      referrals,
      stats: {
        totalReferrals: referrals.length,
        totalPending,
        totalPaid,
        totalRevenue: totalPending + totalPaid,
      },
    };
  }

  // Confirmer qu'un élève s'est bien inscrit (auto-école confirme)
  async confirmReferral(referralId: string) {
    return this.prisma.referral.update({
      where: { id: referralId },
      data: { status: "CONFIRMED" },
    });
  }

  // Marquer la commission comme payée
  async markReferralPaid(referralId: string) {
    return this.prisma.referral.update({
      where: { id: referralId },
      data: { status: "PAID", paidAt: new Date() },
    });
  }

  // Stats pour le dashboard auto-école
  async getAutoEcoleStats(ownerId: string) {
    const autoEcole = await this.prisma.autoEcole.findUnique({
      where: { ownerId },
    });

    if (!autoEcole) {
      throw new NotFoundException("Auto-école non trouvée");
    }

    const referrals = await this.prisma.referral.findMany({
      where: { autoEcoleId: autoEcole.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      autoEcole,
      students: referrals,
      stats: {
        totalStudentsReceived: referrals.length,
        pendingStudents: referrals.filter((r) => r.status === "PENDING").length,
        confirmedStudents: referrals.filter((r) => r.status === "CONFIRMED").length,
      },
    };
  }
}
