// @ts-nocheck
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async getCategories(userId?: string) {
    const categories = await this.prisma.videoCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        videos: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            duration: true,
            isFree: true,
          },
        },
      },
    });

    if (userId) {
      const progress = await this.prisma.videoProgress.findMany({
        where: { userId },
      });

      return categories.map((cat) => ({
        ...cat,
        videos: cat.videos.map((video) => {
          const vidProgress = progress.find((p) => p.videoId === video.id);
          return {
            ...video,
            isWatched: vidProgress?.isCompleted || false,
            watchedSeconds: vidProgress?.watchedSeconds || 0,
          };
        }),
      }));
    }

    return categories;
  }

  async getVideo(slug: string) {
    const video = await this.prisma.video.findUnique({
      where: { slug },
      include: {
        category: { select: { title: true, slug: true } },
      },
    });

    if (!video) {
      throw new NotFoundException("Vidéo non trouvée");
    }

    return video;
  }

  async updateProgress(
    userId: string,
    videoId: string,
    watchedSeconds: number
  ) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException("Vidéo non trouvée");
    }

    const isCompleted = watchedSeconds >= video.duration * 0.9; // 90% regardé = complété

    return this.prisma.videoProgress.upsert({
      where: {
        userId_videoId: { userId, videoId },
      },
      create: {
        userId,
        videoId,
        watchedSeconds,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
      update: {
        watchedSeconds,
        isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
        lastWatchedAt: new Date(),
      },
    });
  }
}
