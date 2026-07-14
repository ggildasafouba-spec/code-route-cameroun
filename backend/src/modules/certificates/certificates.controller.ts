import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { CertificatesService } from "./certificates.service";

@ApiTags("Certificats")
@Controller("certificates")
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  @Get("eligibility")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Vérifier si l'élève peut obtenir le certificat" })
  async checkEligibility(@Request() req: any) {
    return this.certificatesService.checkEligibility(req.user.id);
  }

  @Post("generate")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Générer le certificat de formation" })
  async generate(@Request() req: any) {
    return this.certificatesService.generateCertificate(req.user.id);
  }

  @Get("mine")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Récupérer mon certificat" })
  async getMyCertificate(@Request() req: any) {
    return this.certificatesService.getCertificate(req.user.id);
  }

  @Get("download")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Télécharger le certificat en PDF" })
  async downloadPDF(@Request() req: any, @Res() res: Response) {
    const pdfBuffer = await this.certificatesService.generatePDF(req.user.id);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=certificat-code-route-cameroun.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  @Get("verify/:ref")
  @ApiOperation({
    summary: "Vérifier un certificat par sa référence (public)",
    description:
      "Endpoint public utilisable par les auto-écoles pour vérifier la validité d'un certificat.",
  })
  async verify(@Param("ref") ref: string) {
    return this.certificatesService.verifyCertificate(ref);
  }
}
