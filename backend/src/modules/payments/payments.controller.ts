import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Headers,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";

@ApiTags("Paiements")
@Controller("payments")
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get("forfait")
  @ApiOperation({ summary: "Informations sur le forfait (30 000 FCFA / 6 mois)" })
  async getForfait() {
    return this.paymentsService.getForfaitInfo();
  }

  @Post("initialize")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Initier le paiement du forfait via Mobile Money" })
  async initialize(
    @Body() body: { phone: string; method: "MTN_MOMO" | "ORANGE_MONEY" },
    @Request() req: any
  ) {
    return this.paymentsService.initializePayment(
      req.user.id,
      body.phone,
      body.method
    );
  }

  @Post("webhook")
  @ApiOperation({ summary: "Webhook NotchPay" })
  async webhook(
    @Body() payload: any,
    @Headers("x-notchpay-signature") signature: string
  ) {
    return this.paymentsService.handleWebhook(payload);
  }

  @Get("subscription")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Récupérer l'abonnement de l'utilisateur" })
  async getSubscription(@Request() req: any) {
    return this.paymentsService.getUserSubscription(req.user.id);
  }
}
