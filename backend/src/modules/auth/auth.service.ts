// @ts-nocheck
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    // Vérifier si l'utilisateur existe déjà (par téléphone OU email)
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phone: dto.phone },
          ...(dto.email ? [{ email: dto.email }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        "Un compte avec ce numéro ou cet email existe déjà"
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Créer l'utilisateur
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        email: dto.email,
        password: hashedPassword,
        role: dto.role || "ELEVE",
        city: dto.city,
        permitCategory: dto.permitCategory || "B",
      },
    });

    // Si auto-école, créer l'entité
    if (dto.role === "AUTO_ECOLE" && dto.autoEcoleName) {
      await this.prisma.autoEcole.create({
        data: {
          name: dto.autoEcoleName,
          city: dto.city || "",
          ownerId: user.id,
        },
      });
    }

    // Générer le token (connexion automatique après inscription)
    const token = this.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        city: user.city,
        permitCategory: user.permitCategory,
      },
      accessToken: token,
      message: "Compte créé avec succès. Vous êtes connecté automatiquement.",
    };
  }

  async login(dto: LoginDto) {
    // L'identifiant peut être un numéro de téléphone OU un email
    const identifier = dto.identifier.trim();

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ phone: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        "Aucun compte trouvé avec cet identifiant"
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException("Votre compte a été désactivé");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Mot de passe incorrect");
    }

    // Générer le token
    const token = this.generateToken(user.id, user.role);

    // Récupérer l'abonnement actif
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    const hasActiveSubscription =
      subscription &&
      subscription.status === "ACTIVE" &&
      subscription.endDate > new Date();

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        city: user.city,
        permitCategory: user.permitCategory,
        avatar: user.avatar,
      },
      accessToken: token,
      subscription: hasActiveSubscription
        ? {
            status: "ACTIVE",
            endDate: subscription.endDate,
            daysRemaining: Math.ceil(
              (subscription.endDate.getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            ),
          }
        : null,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        role: true,
        city: true,
        permitCategory: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) throw new UnauthorizedException();

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    return {
      ...user,
      hasActiveSubscription:
        subscription &&
        subscription.status === "ACTIVE" &&
        subscription.endDate > new Date(),
      subscription: subscription
        ? {
            status: subscription.status,
            endDate: subscription.endDate,
            daysRemaining: Math.max(
              0,
              Math.ceil(
                (subscription.endDate.getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              )
            ),
          }
        : null,
    };
  }

  private generateToken(userId: string, role: string): string {
    return this.jwtService.sign({ sub: userId, role });
  }
}
