import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(userId?: string) {
    const categories = await this.prisma.courseCategory.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      include: {
        lessons: {
          where: { isPublished: true },
          select: { id: true },
        },
      },
    });

    // Si utilisateur connecté, ajouter la progression
    if (userId) {
      const progress = await this.prisma.lessonProgress.findMany({
        where: { userId, isCompleted: true },
        include: { lesson: { select: { categoryId: true } } },
      });

      return categories.map((cat) => {
        const completedInCategory = progress.filter(
          (p) => p.lesson.categoryId === cat.id
        ).length;
        return {
          ...cat,
          totalLessons: cat.lessons.length,
          completedLessons: completedInCategory,
          progress:
            cat.lessons.length > 0
              ? Math.round((completedInCategory / cat.lessons.length) * 100)
              : 0,
        };
      });
    }

    return categories.map((cat) => ({
      ...cat,
      totalLessons: cat.lessons.length,
    }));
  }

  async getLessons(categorySlug: string, userId?: string) {
    const category = await this.prisma.courseCategory.findUnique({
      where: { slug: categorySlug },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!category) {
      throw new NotFoundException("Catégorie non trouvée");
    }

    if (userId) {
      const progress = await this.prisma.lessonProgress.findMany({
        where: {
          userId,
          lessonId: { in: category.lessons.map((l) => l.id) },
        },
      });

      return {
        ...category,
        lessons: category.lessons.map((lesson) => ({
          ...lesson,
          isCompleted:
            progress.find((p) => p.lessonId === lesson.id)?.isCompleted ||
            false,
        })),
      };
    }

    return category;
  }

  async getLesson(slug: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { slug },
      include: {
        images: true,
        category: { select: { title: true, slug: true } },
      },
    });

    if (!lesson) {
      throw new NotFoundException("Leçon non trouvée");
    }

    return lesson;
  }

  async markLessonComplete(userId: string, lessonId: string) {
    return this.prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        isCompleted: true,
        completedAt: new Date(),
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }
}
