// @ts-nocheck
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        city: true,
        permitCategory: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Utilisateur non trouvé");
    }

    return user;
  }

  async getStats(userId: string) {
    const [quizAttempts, examAttempts, lessonProgress, videoProgress] =
      await Promise.all([
        this.prisma.quizAttempt.findMany({
          where: { userId },
          orderBy: { startedAt: "desc" },
          take: 20,
        }),
        this.prisma.examAttempt.findMany({
          where: { userId },
          orderBy: { startedAt: "desc" },
        }),
        this.prisma.lessonProgress.findMany({
          where: { userId, isCompleted: true },
        }),
        this.prisma.videoProgress.findMany({
          where: { userId, isCompleted: true },
        }),
      ]);

    const totalQuizScore = quizAttempts.reduce(
      (acc, a) => acc + (a.score / a.totalQuestions) * 100,
      0
    );
    const averageScore =
      quizAttempts.length > 0
        ? Math.round(totalQuizScore / quizAttempts.length)
        : 0;

    return {
      lessonsCompleted: lessonProgress.length,
      videosWatched: videoProgress.length,
      quizAttempts: quizAttempts.length,
      examAttempts: examAttempts.length,
      averageScore,
      bestExamScore: examAttempts.length
        ? Math.max(...examAttempts.map((e) => e.score))
        : 0,
      examsPassed: examAttempts.filter((e) => e.passed).length,
    };
  }
}
