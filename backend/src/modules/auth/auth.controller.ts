import { Controller, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Authentification")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({
    summary: "Inscription + connexion automatique",
    description:
      "Crée un compte et retourne un token JWT. L'utilisateur est connecté automatiquement.",
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOperation({
    summary: "Connexion par téléphone ou email",
    description:
      "L'identifiant peut être un numéro de téléphone (+237...) ou une adresse email.",
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Récupérer les infos de l'utilisateur connecté",
    description: "Retourne le profil + statut abonnement.",
  })
  async getMe(@Request() req: any) {
    return this.authService.getMe(req.user.id);
  }
}
