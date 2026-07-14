import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AutoEcolesService } from "./auto-ecoles.service";

@ApiTags("Auto-Écoles Partenaires")
@Controller("auto-ecoles")
export class AutoEcolesController {
  constructor(private autoEcolesService: AutoEcolesService) {}

  @Get("partners")
  @ApiOperation({ summary: "Liste des auto-écoles partenaires" })
  async getPartners(@Query("city") city?: string) {
    return this.autoEcolesService.getPartners(city);
  }

  @Post("enroll/:autoEcoleId")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "S'inscrire à l'examen via une auto-école partenaire" })
  async enroll(
    @Param("autoEcoleId") autoEcoleId: string,
    @Request() req: any
  ) {
    return this.autoEcolesService.enrollInAutoEcole(req.user.id, autoEcoleId);
  }

  // === Endpoints Admin ===

  @Get("commissions")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "[Admin] Voir toutes les commissions" })
  async getCommissions(@Query("status") status?: string) {
    return this.autoEcolesService.getCommissions(status);
  }

  @Post("referrals/:id/confirm")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "[Admin] Confirmer un referral" })
  async confirmReferral(@Param("id") id: string) {
    return this.autoEcolesService.confirmReferral(id);
  }

  @Post("referrals/:id/paid")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "[Admin] Marquer une commission payée" })
  async markPaid(@Param("id") id: string) {
    return this.autoEcolesService.markReferralPaid(id);
  }

  // === Endpoint Auto-École ===

  @Get("my-stats")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "[Auto-École] Voir mes stats et élèves reçus" })
  async getMyStats(@Request() req: any) {
    return this.autoEcolesService.getAutoEcoleStats(req.user.id);
  }
}
