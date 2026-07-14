// @ts-nocheck
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import axios from "axios";

// Forfait unique
const FORFAIT = {
  price: 30000, // 30 000 FCFA
  duration: 180, // 6 mois (180 jours)
  name: "Formation Code de la Route - 6 mois",
};

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initializePayment(
    userId: string,
    phone: string,
    method: "MTN_MOMO" | "ORANGE_MONEY"
  ) {
    // Vérifier si l'utilisateur a déjà un abonnement actif
    const existingSub = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (existingSub && existingSub.status === "ACTIVE" && existingSub.endDate > new Date()) {
      throw new BadRequestException(
        "Vous avez déjà un abonnement actif jusqu'au " +
          existingSub.endDate.toLocaleDateString("fr-FR")
      );
    }

    // Calculer la date de fin (6 mois)
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + FORFAIT.duration);

    // Créer l'abonnement (inactif jusqu'au paiement)
    const subscription = await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        status: "ACTIVE",
        startDate,
        endDate,
        amount: FORFAIT.price,
      },
      update: {
        status: "ACTIVE",
        startDate,
        endDate,
        amount: FORFAIT.price,
      },
    });

    // Initier le paiement via NotchPay
    try {
      const response = await axios.post(
        "https://api.notchpay.co/payments/initialize",
        {
          amount: FORFAIT.price,
          currency: "XAF",
          phone,
          description: FORFAIT.name,
          reference: `CR-${subscription.id}-${Date.now()}`,
          callback: `${process.env.FRONTEND_URL}/paiement/confirmation`,
        },
        {
          headers: {
            Authorization: process.env.NOTCHPAY_PUBLIC_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      // Sauvegarder le paiement
      await this.prisma.payment.upsert({
        where: { subscriptionId: subscription.id },
        create: {
          subscriptionId: subscription.id,
          amount: FORFAIT.price,
          currency: "XAF",
          status: "PENDING",
          method,
          phone,
          transactionRef: response.data?.transaction?.reference,
        },
        update: {
          status: "PENDING",
          method,
          phone,
          transactionRef: response.data?.transaction?.reference,
        },
      });

      return {
        subscriptionId: subscription.id,
        paymentUrl: response.data?.authorization_url,
        reference: response.data?.transaction?.reference,
        amount: FORFAIT.price,
        plan: FORFAIT.name,
        endDate: endDate.toISOString(),
      };
    } catch (error) {
      throw new BadRequestException(
        "Erreur lors de l'initialisation du paiement. Veuillez réessayer."
      );
    }
  }

  async handleWebhook(payload: any) {
    const { event, data } = payload;

    if (event === "payment.complete") {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionRef: data.reference },
        include: { subscription: true },
      });

      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: "COMPLETED" },
        });

        // Activer l'abonnement
        await this.prisma.subscription.update({
          where: { id: payment.subscription.id },
          data: { status: "ACTIVE" },
        });
      }
    }

    if (event === "payment.failed") {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionRef: data.reference },
      });

      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: "FAILED" },
        });

        await this.prisma.subscription.update({
          where: { id: payment.subscriptionId },
          data: { status: "CANCELLED" },
        });
      }
    }
  }

  async getUserSubscription(userId: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { payment: true },
    });

    if (!sub) return null;

    const now = new Date();
    const isExpired = sub.endDate < now;
    const daysRemaining = isExpired
      ? 0
      : Math.ceil((sub.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      ...sub,
      isExpired,
      daysRemaining,
      isPaid: sub.payment?.status === "COMPLETED",
    };
  }

  async getForfaitInfo() {
    return {
      price: FORFAIT.price,
      duration: "6 mois",
      name: FORFAIT.name,
      features: [
        "Accès illimité à tous les cours",
        "Toutes les vidéos pédagogiques",
        "QCM illimités avec corrections",
        "Examens blancs illimités",
        "Suivi de progression détaillé",
        "Certificat de formation à la fin",
        "Mise en relation avec auto-école partenaire",
      ],
    };
  }
}
