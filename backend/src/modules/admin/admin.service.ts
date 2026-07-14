// @ts-nocheck
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // === DASHBOARD STATS ===
  async getDashboardStats() {
    const [
      totalUsers,
      totalEleves,
      totalAutoEcoles,
      activeSubscriptions,
      totalPayments,
      completedPayments,
      totalReferrals,
      paidReferrals,
      totalCertificates,
      totalQuestions,
      totalExamAttempts,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: "ELEVE" } }),
      this.prisma.autoEcole.count(),
      this.prisma.subscription.count({ where: { status: "ACTIVE" } }),
      this.prisma.payment.count(),
      this.prisma.payment.count({ where: { status: "COMPLETED" } }),
      this.prisma.referral.count(),
      this.prisma.referral.count({ where: { status: "PAID" } }),
      this.prisma.certificate.count(),
      this.prisma.question.count(),
      this.prisma.examAttempt.count(),
    ]);

    // Revenus
    const payments = await this.prisma.payment.findMany({
      where: { status: "COMPLETED" },
      select: { amount: true },
    });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // Commissions
    const referrals = await this.prisma.referral.findMany({
      where: { status: { in: ["CONFIRMED", "PAID"] } },
      select: { commissionAmount: true, status: true },
    });
    const totalCommissions = referrals.reduce(
      (sum, r) => sum + r.commissionAmount,
      0
    );
    const pendingCommissions = referrals
      .filter((r) => r.status === "CONFIRMED")
      .reduce((sum, r) => sum + r.commissionAmount, 0);

    // Inscriptions récentes (7 derniers jours)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = await this.prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    return {
      users: {
        total: totalUsers,
        eleves: totalEleves,
        autoEcoles: totalAutoEcoles,
        recentSignups,
      },
      subscriptions: {
        active: activeSubscriptions,
        totalPayments,
        completedPayments,
      },
      revenue: {
        total: totalRevenue,
        formatted: `${totalRevenue.toLocaleString()} FCFA`,
      },
      commissions: {
        total: totalCommissions,
        pending: pendingCommissions,
        totalReferrals,
        paidReferrals,
        formatted: `${totalCommissions.toLocaleString()} FCFA`,
      },
      content: {
        questions: totalQuestions,
        certificates: totalCertificates,
        examAttempts: totalExamAttempts,
      },
    };
  }

  // === GESTION UTILISATEURS ===
  async getUsers(page = 1, limit = 20, role?: string, search?: string) {
    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phone: true,
          email: true,
          role: true,
          city: true,
          permitCategory: true,
          isActive: true,
          createdAt: true,
          subscription: {
            select: { status: true, endDate: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async toggleUserStatus(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });
  }

  // === GESTION AUTO-ÉCOLES ===
  async getAutoEcoles(verified?: boolean) {
    const where: any = {};
    if (verified !== undefined) where.isVerified = verified;

    return this.prisma.autoEcole.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: { firstName: true, lastName: true, phone: true, email: true },
        },
        _count: { select: { referrals: true, enrollments: true } },
      },
    });
  }

  async verifyAutoEcole(autoEcoleId: string) {
    return this.prisma.autoEcole.update({
      where: { id: autoEcoleId },
      data: { isVerified: true, isPartner: true },
    });
  }

  async updateAutoEcoleCommission(autoEcoleId: string, commissionRate: number) {
    return this.prisma.autoEcole.update({
      where: { id: autoEcoleId },
      data: { commissionRate },
    });
  }

  // === GESTION COMMISSIONS ===
  async getCommissions(status?: string, page = 1, limit = 20) {
    const where: any = {};
    if (status) where.status = status;

    const [referrals, total] = await Promise.all([
      this.prisma.referral.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { firstName: true, lastName: true, phone: true },
          },
          autoEcole: {
            select: { name: true, city: true },
          },
        },
      }),
      this.prisma.referral.count({ where }),
    ]);

    const stats = await this.prisma.referral.groupBy({
      by: ["status"],
      _sum: { commissionAmount: true },
      _count: true,
    });

    return {
      referrals,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      stats: stats.map((s) => ({
        status: s.status,
        count: s._count,
        total: s._sum.commissionAmount || 0,
      })),
    };
  }

  async confirmReferral(referralId: string) {
    return this.prisma.referral.update({
      where: { id: referralId },
      data: { status: "CONFIRMED" },
    });
  }

  async markReferralPaid(referralId: string) {
    return this.prisma.referral.update({
      where: { id: referralId },
      data: { status: "PAID", paidAt: new Date() },
    });
  }

  // === GESTION PAIEMENTS ===
  async getPayments(status?: string, page = 1, limit = 20) {
    const where: any = {};
    if (status) where.status = status;

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          subscription: {
            include: {
              user: {
                select: { firstName: true, lastName: true, phone: true },
              },
            },
          },
        },
      }),
      this.prisma.payment.count({ where }),
    ]);

    return {
      payments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  // === GESTION CONTENU ===
  async getContentStats() {
    const [categories, lessons, videos, questions, quizzes, exams] =
      await Promise.all([
        this.prisma.courseCategory.count(),
        this.prisma.lesson.count(),
        this.prisma.video.count(),
        this.prisma.question.count(),
        this.prisma.quiz.count(),
        this.prisma.exam.count(),
      ]);

    return { categories, lessons, videos, questions, quizzes, exams };
  }

  // === REVENUS MENSUELS ===
  async getMonthlyRevenue(months = 6) {
    const results = [];
    const now = new Date();

    for (let i = 0; i < months; i++) {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const payments = await this.prisma.payment.findMany({
        where: {
          status: "COMPLETED",
          createdAt: { gte: startOfMonth, lte: endOfMonth },
        },
        select: { amount: true },
      });

      const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
      const signups = await this.prisma.user.count({
        where: {
          createdAt: { gte: startOfMonth, lte: endOfMonth },
          role: "ELEVE",
        },
      });

      results.unshift({
        month: startOfMonth.toLocaleDateString("fr-FR", {
          month: "short",
          year: "numeric",
        }),
        revenue,
        signups,
      });
    }

    return results;
  }
}
