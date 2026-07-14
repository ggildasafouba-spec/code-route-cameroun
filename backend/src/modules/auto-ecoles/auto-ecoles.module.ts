import { Module } from "@nestjs/common";
import { AutoEcolesService } from "./auto-ecoles.service";
import { AutoEcolesController } from "./auto-ecoles.controller";

@Module({
  controllers: [AutoEcolesController],
  providers: [AutoEcolesService],
})
export class AutoEcolesModule {}
