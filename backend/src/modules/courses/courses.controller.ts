import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CoursesService } from "./courses.service";

@ApiTags("Cours")
@Controller("courses")
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get("categories")
  @ApiOperation({ summary: "Liste des catégories de cours" })
  async getCategories() {
    return this.coursesService.getCategories();
  }

  @Get("categories/:slug")
  @ApiOperation({ summary: "Leçons d'une catégorie" })
  async getLessons(@Param("slug") slug: string) {
    return this.coursesService.getLessons(slug);
  }

  @Get("lessons/:slug")
  @ApiOperation({ summary: "Contenu d'une leçon" })
  async getLesson(@Param("slug") slug: string) {
    return this.coursesService.getLesson(slug);
  }

  @Post("lessons/:id/complete")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Marquer une leçon comme terminée" })
  async markComplete(@Param("id") id: string, @Request() req: any) {
    return this.coursesService.markLessonComplete(req.user.id, id);
  }
}
