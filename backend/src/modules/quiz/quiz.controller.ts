import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { QuizService } from "./quiz.service";
import { RevisionEngineService } from "./revision-engine.service";

@ApiTags("QCM & Révision")
@Controller("quiz")
export class QuizController {
  constructor(
    private quizService: QuizService,
    private revisionEngine: RevisionEngineService
  ) {}

  // === MODES DE RÉVISION (système Stych) ===

  @Get("series/thematique/:categorySlug")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Série thématique — 20 questions sur un thème",
    description:
      "Priorise les questions jamais vues, puis les ratées, puis les autres.",
  })
  async getThematicSeries(
    @Param("categorySlug") categorySlug: string,
    @Query("count") count: string,
    @Request() req: any
  ) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "thematique",
      categorySlug,
      count: count ? parseInt(count) : 20,
    });
  }

  @Get("series/aleatoire")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Série aléatoire — mix de toutes les catégories",
    description:
      "Pondéré selon vos points faibles : plus de questions dans les catégories où vous avez du mal.",
  })
  async getRandomSeries(
    @Query("count") count: string,
    @Request() req: any
  ) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "aleatoire",
      count: count ? parseInt(count) : 20,
    });
  }

  @Get("series/erreurs")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Révision des erreurs — refaire les questions ratées",
    description: "Reprend les questions auxquelles vous avez mal répondu.",
  })
  async getErrorSeries(@Request() req: any) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "erreurs",
      count: 20,
    });
  }

  @Get("series/express")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Série express — 10 questions rapides",
    description: "Pour réviser en peu de temps.",
  })
  async getExpressSeries(@Request() req: any) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "express",
    });
  }

  @Get("series/difficile")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Série difficile — questions de niveau 3",
    description: "Uniquement les questions les plus difficiles.",
  })
  async getDifficultSeries(@Request() req: any) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "difficile",
      count: 20,
    });
  }

  @Get("series/examen")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Examen blanc — 40 questions, 30 min (unique à chaque fois)",
    description:
      "Simule les conditions réelles de l'examen. Chaque examen est différent.",
  })
  async getExamSeries(@Request() req: any) {
    return this.revisionEngine.generateSeries(req.user.id, {
      type: "examen",
    });
  }

  // === PROGRESSION ===

  @Get("progress")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Dashboard de progression complet",
    description:
      "Score par catégorie, niveau global, recommandation personnalisée, prêt pour l'examen ?",
  })
  async getProgress(@Request() req: any): Promise<any> {
    return this.revisionEngine.getProgressDashboard(req.user.id);
  }

  @Get("performance")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Performance détaillée par catégorie",
  })
  async getPerformance(@Request() req: any): Promise<any> {
    return this.revisionEngine.getUserPerformance(req.user.id);
  }

  // === SOUMISSION ===

  @Post("submit")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Soumettre les réponses d'une série",
    description:
      "Retourne le score, les corrections avec explications, et met à jour la progression.",
  })
  async submitSeries(
    @Body()
    body: {
      mode: string;
      responses: { questionId: string; answerId: string }[];
      timeSpent?: number;
    },
    @Request() req: any
  ) {
    return this.quizService.submitQuizResponses(
      req.user.id,
      body.responses,
      body.timeSpent,
      body.mode
    );
  }

  // === CATÉGORIES ===

  @Get("categories")
  @ApiOperation({ summary: "Liste des catégories de questions" })
  async getCategories() {
    return this.quizService.getCategories();
  }
}
