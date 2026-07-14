import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

const REWARD_DAYS = 7; // 1 semaine gratuite par parrainage

@Injectable()
export class ReferralService {
  constructor(private prisma: PrismaService) {}

  // Générer le code de parrainage (basé sur le nom + ID court)
  async getMyReferralCode(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, id: true },
    });

    if (!user) throw new BadRequestException("Utilisateur non trouvé");

    const code = `${user.firstName.toUpperCase()}-${user.id.slice(-6).toUpperCase()}`;

    return {
      code,
      link: `${process.env.FRONTEND_URL}/inscription?ref=${code}`,
      reward: `${REWARD_DAYS} jours gratuits pour vous et votre ami`,
    };
  }

  // Appliquer un parrainage lors de l'inscription
  async applyReferral(newUserId: string, referralCode: string) {
    // Trouver le parrain par son code (firstName + 6 derniers chars de l'ID)
    const users = await this.prisma.user.findMany({
      select: { id: true, firstName: true },
    });

    const sponsor = users.find((u) => {
      const code = `${u.firstName.toUpperCase()}-${u.id.slice(-6).toUpperCase()}`;
      return code === referralCode.toUpperCase();
    });

    if (!sponsor) {
      throw new BadRequestException("Code de parrainage invalide");
    }

    if (sponsor.id === newUserId) {
      throw new BadRequestException(
        "Vous ne pouvez pas utiliser votre propre code"
      );
    }

    // Ajouter 7 jours au parrain
    const sponsorSub = await this.prisma.subscription.findUnique({
      where: { userId: sponsor.id },
    });

    if (sponsorSub) {
      const newEndDate = new Date(sponsorSub.endDate);
      newEndDate.setDate(newEndDate.getDate() + REWARD_DAYS);

      await this.prisma.subscription.update({
        where: { userId: sponsor.id },
        data: { endDate: newEndDate },
      });
    }

    // Ajouter 7 jours au filleul
    const filleulSub = await this.prisma.subscription.findUnique({
      where: { userId: newUserId },
    });

    if (filleulSub) {
      const newEndDate = new Date(filleulSub.endDate);
      newEndDate.setDate(newEndDate.getDate() + REWARD_DAYS);

      await this.prisma.subscription.update({
        where: { userId: newUserId },
        data: { endDate: newEndDate },
      });
    }

    return {
      success: true,
      message: `Parrainage appliqué ! +${REWARD_DAYS} jours pour vous et votre parrain.`,
    };
  }

  // Stats de parrainage
  async getMyReferralStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, id: true },
    });

    if (!user) return null;

    // Compter les filleuls (approximation via les dates d'inscription)
    // En production, utiliser une table dédiée
    return {
      code: `${user.firstName.toUpperCase()}-${user.id.slice(-6).toUpperCase()}`,
      totalInvited: 0,
      totalSignedUp: 0,
      daysEarned: 0,
      reward: `${REWARD_DAYS} jours par ami inscrit`,
    };
  }
}
