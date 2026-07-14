import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ReferralService } from "./referral.service";

@ApiTags("Parrainage")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("referral")
export class ReferralController {
  constructor(private referralService: ReferralService) {}

  @Get("my-code")
  @ApiOperation({ summary: "Récupérer mon code et lien de parrainage" })
  async getMyCode(@Request() req: any) {
    return this.referralService.getMyReferralCode(req.user.id);
  }

  @Post("apply")
  @ApiOperation({ summary: "Appliquer un code de parrainage" })
  async applyCode(
    @Body() body: { referralCode: string },
    @Request() req: any
  ) {
    return this.referralService.applyReferral(req.user.id, body.referralCode);
  }

  @Get("stats")
  @ApiOperation({ summary: "Mes statistiques de parrainage" })
  async getStats(@Request() req: any) {
    return this.referralService.getMyReferralStats(req.user.id);
  }
}
