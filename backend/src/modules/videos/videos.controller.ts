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
import { VideosService } from "./videos.service";

@ApiTags("Vidéos")
@Controller("videos")
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get("categories")
  @ApiOperation({ summary: "Liste des catégories de vidéos" })
  async getCategories() {
    return this.videosService.getCategories();
  }

  @Get(":slug")
  @ApiOperation({ summary: "Détail d'une vidéo" })
  async getVideo(@Param("slug") slug: string) {
    return this.videosService.getVideo(slug);
  }

  @Post(":id/progress")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mettre à jour la progression vidéo" })
  async updateProgress(
    @Param("id") id: string,
    @Body() body: { watchedSeconds: number },
    @Request() req: any
  ) {
    return this.videosService.updateProgress(
      req.user.id,
      id,
      body.watchedSeconds
    );
  }
}
