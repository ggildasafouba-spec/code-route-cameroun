import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags("Utilisateurs")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  @ApiOperation({ summary: "Récupérer le profil de l'utilisateur connecté" })
  async getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @Get("stats")
  @ApiOperation({
    summary: "Récupérer les statistiques de l'utilisateur connecté",
  })
  async getStats(@Request() req: any) {
    return this.usersService.getStats(req.user.id);
  }
}
