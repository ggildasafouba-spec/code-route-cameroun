import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

/**
 * Guard qui vérifie que l'utilisateur a un abonnement actif.
 * À utiliser sur les routes qui nécessitent un abonnement payant.
 * 
 * Usage: @UseGuards(AuthGuard("jwt"), SubscriptionGuard)
 */
@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Authentification requise");
    }

    // Les admins ont toujours accès
    if (user.role === "ADMIN") return true;

    // Les auto-écoles ont toujours accès
    if (user.role === "AUTO_ECOLE") return true;

    // Vérifier l'abonnement actif
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription) {
      throw new ForbiddenException(
        "Vous devez souscrire au forfait pour accéder à ce contenu. Rendez-vous sur la page de paiement."
      );
    }

    if (subscription.status !== "ACTIVE") {
      throw new ForbiddenException(
        "Votre abonnement n'est pas actif. Veuillez effectuer le paiement."
      );
    }

    if (subscription.endDate < new Date()) {
      throw new ForbiddenException(
        "Votre abonnement a expiré. Renouvelez votre forfait pour continuer."
      );
    }

    return true;
  }
}
