import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ExamsService } from "./exams.service";

@ApiTags("Examens Blancs")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("exams")
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: "Liste des examens blancs disponibles" })
  async getExams(@Request() req: any) {
    return this.examsService.getExams(req.user.id);
  }

  @Post(":id/start")
  @ApiOperation({ summary: "Démarrer un examen blanc" })
  async startExam(@Param("id") id: string) {
    return this.examsService.startExam(id);
  }

  @Post(":id/submit")
  @ApiOperation({ summary: "Soumettre un examen blanc" })
  async submitExam(
    @Param("id") id: string,
    @Body()
    body: {
      responses: { questionId: string; answerId: string }[];
      timeSpent: number;
    },
    @Request() req: any
  ) {
    return this.examsService.submitExam(
      req.user.id,
      id,
      body.responses,
      body.timeSpent
    );
  }

  @Get("history")
  @ApiOperation({ summary: "Historique des examens passés" })
  async getHistory(@Request() req: any) {
    return this.examsService.getAttemptHistory(req.user.id);
  }
}
