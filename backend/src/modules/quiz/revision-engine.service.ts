// @ts-nocheck
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

/**
 * MOTEUR DE RÉVISION INTELLIGENT
 * Inspiré du système Stych / Ornikar / En Voiture Simone
 * 
 * Principes :
 * 1. Séries thématiques — réviser par thème (signalisation, priorités, etc.)
 * 2. Séries aléatoires — mélange de tous les thèmes
 * 3. Révision des erreurs — refaire les questions ratées
 * 4. Examens blancs — conditions réelles (40 questions, 30 min)
 * 5. Apprentissage adaptatif — prioriser les points faibles
 * 6. Progression par paliers — débloquer le niveau suivant
 */

export interface RevisionMode {
  type:
    | "thematique" // Série sur un thème
    | "aleatoire" // Série mixte
    | "erreurs" // Questions ratées
    | "examen" // Examen blanc 40 questions
    | "express" // Série rapide 10 questions
    | "difficile"; // Questions niveau 3
  categorySlug?: string;
  count?: number;
}

interface UserPerformance {
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  totalAttempts: number;
  correctAnswers: number;
  percentage: number;
  level: "debutant" | "intermediaire" | "avance" | "maitrise";
}

@Injectable()
export class RevisionEngineService {
  constructor(private prisma: PrismaService) {}

  /**
   * Générer une série de questions selon le mode choisi
   */
  async generateSeries(userId: string, mode: RevisionMode) {
    const count = mode.count || (mode.type === "examen" ? 40 : mode.type === "express" ? 10 : 20);

    switch (mode.type) {
      case "thematique":
        return this.getThematicSeries(userId, mode.categorySlug!, count);
      case "aleatoire":
        return this.getRandomSeries(userId, count);
      case "erreurs":
        return this.getErrorSeries(userId, count);
      case "examen":
        return this.getExamSeries(userId);
      case "express":
        return this.getExpressSeries(userId);
      case "difficile":
        return this.getDifficultSeries(userId, count);
      default:
        return this.getRandomSeries(userId, count);
    }
  }

  /**
   * Série thématique — questions d'une seule catégorie
   * Priorise les questions pas encore vues, puis les ratées
   */
  private async getThematicSeries(userId: string, categorySlug: string, count: number) {
    const category = await this.prisma.quizCategory.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) return { questions: [], meta: {} };

    // Récupérer l'historique de l'utilisateur pour cette catégorie
    const previousResponses = await this.prisma.quizResponse.findMany({
      where: {
        attempt: { userId },
      },
      select: { questionId: true, isCorrect: true },
    });

    const answeredQuestionIds = [...new Set(previousResponses.map((r) => r.questionId))];
    const incorrectQuestionIds = [
      ...new Set(
        previousResponses
          .filter((r) => !r.isCorrect)
          .map((r) => r.questionId)
      ),
    ];

    // Priorité : 1. Jamais vues, 2. Ratées, 3. Les autres
    const unseenQuestions = await this.prisma.question.findMany({
      where: {
        categoryId: category.id,
        isPublished: true,
        id: { notIn: answeredQuestionIds },
      },
      include: { answers: { select: { id: true, text: true } } },
      take: count,
    });

    let questions = [...unseenQuestions];

    if (questions.length < count) {
      const errorQuestions = await this.prisma.question.findMany({
        where: {
          categoryId: category.id,
          isPublished: true,
          id: { in: incorrectQuestionIds },
        },
        include: { answers: { select: { id: true, text: true } } },
        take: count - questions.length,
      });
      questions = [...questions, ...errorQuestions];
    }

    if (questions.length < count) {
      const remaining = await this.prisma.question.findMany({
        where: {
          categoryId: category.id,
          isPublished: true,
          id: { notIn: questions.map((q) => q.id) },
        },
        include: { answers: { select: { id: true, text: true } } },
        take: count - questions.length,
      });
      questions = [...questions, ...remaining];
    }

    // Mélanger
    questions = this.shuffle(questions);

    return {
      mode: "thematique",
      category: { title: category.title, slug: category.slug },
      totalQuestions: questions.length,
      timeLimit: null,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        difficulty: q.difficulty,
        answers: this.shuffle(q.answers),
      })),
    };
  }

  /**
   * Série aléatoire — mélange de toutes les catégories
   * Pondéré selon les points faibles
   */
  private async getRandomSeries(userId: string, count: number) {
    const performance = await this.getUserPerformance(userId);

    // Pondérer : plus de questions dans les catégories faibles
    const weakCategories = performance
      .filter((p) => p.percentage < 70)
      .map((p) => p.categoryId);

    let questions = [];

    if (weakCategories.length > 0) {
      // 60% des questions viennent des catégories faibles
      const weakCount = Math.ceil(count * 0.6);
      const weakQuestions = await this.prisma.question.findMany({
        where: {
          categoryId: { in: weakCategories },
          isPublished: true,
        },
        include: { answers: { select: { id: true, text: true } } },
        take: weakCount,
      });
      questions = [...weakQuestions];
    }

    // Compléter avec des questions aléatoires
    const remaining = count - questions.length;
    const randomQuestions = await this.prisma.question.findMany({
      where: {
        isPublished: true,
        id: { notIn: questions.map((q) => q.id) },
      },
      include: { answers: { select: { id: true, text: true } } },
      take: remaining,
    });

    questions = this.shuffle([...questions, ...randomQuestions]);

    return {
      mode: "aleatoire",
      totalQuestions: questions.length,
      timeLimit: null,
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        difficulty: q.difficulty,
        answers: this.shuffle(q.answers),
      })),
    };
  }

  /**
   * Série d'erreurs — refaire les questions ratées
   */
  private async getErrorSeries(userId: string, count: number) {
    // Trouver les questions mal répondues
    const incorrectResponses = await this.prisma.quizResponse.findMany({
      where: {
        attempt: { userId },
        isCorrect: false,
      },
      select: { questionId: true },
      orderBy: { attempt: { startedAt: "desc" } },
    });

    const questionIds = [...new Set(incorrectResponses.map((r) => r.questionId))];

    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds.slice(0, count) },
        isPublished: true,
      },
      include: { answers: { select: { id: true, text: true } } },
    });

    return {
      mode: "erreurs",
      totalQuestions: questions.length,
      timeLimit: null,
      message: questions.length === 0
        ? "Bravo ! Vous n'avez aucune erreur à revoir."
        : `${questions.length} questions à retravailler`,
      questions: this.shuffle(questions).map((q: any) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        difficulty: q.difficulty,
        answers: this.shuffle(q.answers),
      })),
    };
  }

  /**
   * Examen blanc — 40 questions, 30 minutes, toutes catégories
   * Chaque examen est UNIQUE (jamais la même combinaison)
   */
  private async getExamSeries(userId: string) {
    const categories = await this.prisma.quizCategory.findMany();

    // Répartition par catégorie (proche du vrai examen)
    const distribution: Record<string, number> = {};
    const questionsPerCategory = Math.floor(40 / categories.length);
    let remaining = 40;

    categories.forEach((cat, i) => {
      if (i === categories.length - 1) {
        distribution[cat.id] = remaining;
      } else {
        distribution[cat.id] = questionsPerCategory;
        remaining -= questionsPerCategory;
      }
    });

    let allQuestions: any[] = [];

    for (const [categoryId, count] of Object.entries(distribution)) {
      const catQuestions = await this.prisma.question.findMany({
        where: { categoryId, isPublished: true },
        include: { answers: { select: { id: true, text: true } } },
      });

      // Mélanger et prendre le nombre requis
      const selected = this.shuffle(catQuestions).slice(0, count);
      allQuestions = [...allQuestions, ...selected];
    }

    // Mélanger toutes les questions
    allQuestions = this.shuffle(allQuestions);

    return {
      mode: "examen",
      totalQuestions: allQuestions.length,
      timeLimit: 1800, // 30 minutes
      passingScore: 28, // 70% = 28/40
      questions: allQuestions.map((q: any) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        difficulty: q.difficulty,
        answers: this.shuffle(q.answers),
      })),
    };
  }

  /**
   * Série express — 10 questions rapides
   */
  private async getExpressSeries(userId: string) {
    return this.getRandomSeries(userId, 10);
  }

  /**
   * Série difficile — uniquement les questions niveau 3
   */
  private async getDifficultSeries(userId: string, count: number) {
    const questions = await this.prisma.question.findMany({
      where: { difficulty: 3, isPublished: true },
      include: { answers: { select: { id: true, text: true } } },
    });

    const selected = this.shuffle(questions).slice(0, count);

    return {
      mode: "difficile",
      totalQuestions: selected.length,
      timeLimit: null,
      questions: selected.map((q: any) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        difficulty: q.difficulty,
        answers: this.shuffle(q.answers),
      })),
    };
  }

  /**
   * Analyser la performance de l'utilisateur par catégorie
   */
  async getUserPerformance(userId: string): Promise<UserPerformance[]> {
    const categories = await this.prisma.quizCategory.findMany();

    const responses = await this.prisma.quizResponse.findMany({
      where: { attempt: { userId } },
      include: {
        attempt: {
          include: {
            quiz: {
              include: {
                questions: {
                  include: { question: { select: { categoryId: true } } },
                },
              },
            },
          },
        },
      },
    });

    // Calculer par catégorie
    const categoryStats: Record<string, { correct: number; total: number }> = {};

    // Initialiser
    categories.forEach((cat) => {
      categoryStats[cat.id] = { correct: 0, total: 0 };
    });

    // Compter les réponses par catégorie via les questions
    for (const response of responses) {
      // On utilise le questionId pour retrouver la catégorie
      const question = await this.prisma.question.findUnique({
        where: { id: response.questionId },
        select: { categoryId: true },
      });

      if (question && categoryStats[question.categoryId]) {
        categoryStats[question.categoryId].total++;
        if (response.isCorrect) {
          categoryStats[question.categoryId].correct++;
        }
      }
    }

    return categories.map((cat) => {
      const stats = categoryStats[cat.id];
      const percentage =
        stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

      let level: "debutant" | "intermediaire" | "avance" | "maitrise";
      if (percentage < 40) level = "debutant";
      else if (percentage < 70) level = "intermediaire";
      else if (percentage < 90) level = "avance";
      else level = "maitrise";

      return {
        categoryId: cat.id,
        categorySlug: cat.slug,
        categoryTitle: cat.title,
        totalAttempts: stats.total,
        correctAnswers: stats.correct,
        percentage,
        level,
      };
    });
  }

  /**
   * Dashboard de progression global
   */
  async getProgressDashboard(userId: string) {
    const performance = await this.getUserPerformance(userId);

    const totalAttempts = performance.reduce((s, p) => s + p.totalAttempts, 0);
    const totalCorrect = performance.reduce((s, p) => s + p.correctAnswers, 0);
    const overallPercentage =
      totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    // Examens blancs
    const examAttempts = await this.prisma.examAttempt.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: 10,
    });

    const examsPassed = examAttempts.filter((e) => e.passed).length;
    const lastExamScore = examAttempts[0]
      ? Math.round((examAttempts[0].score / examAttempts[0].totalQuestions) * 100)
      : null;

    // Prêt pour l'examen ?
    const isReadyForExam =
      overallPercentage >= 80 &&
      examsPassed >= 3 &&
      performance.every((p) => p.percentage >= 60);

    // Recommandation
    let recommendation: string;
    if (totalAttempts === 0) {
      recommendation = "Commencez par une série thématique sur la signalisation.";
    } else if (overallPercentage < 50) {
      const weakest = performance.sort((a, b) => a.percentage - b.percentage)[0];
      recommendation = `Concentrez-vous sur "${weakest.categoryTitle}" où vous avez ${weakest.percentage}%.`;
    } else if (overallPercentage < 70) {
      recommendation = "Révisez vos erreurs et faites des séries aléatoires.";
    } else if (examsPassed < 3) {
      recommendation = "Passez des examens blancs pour vous habituer aux conditions réelles.";
    } else {
      recommendation = "Excellent ! Vous êtes prêt pour l'examen. Continuez de réviser pour maintenir votre niveau.";
    }

    return {
      overall: {
        totalQuestions: totalAttempts,
        correctAnswers: totalCorrect,
        percentage: overallPercentage,
        level: this.getGlobalLevel(overallPercentage),
      },
      categories: performance,
      exams: {
        total: examAttempts.length,
        passed: examsPassed,
        lastScore: lastExamScore,
        history: examAttempts.slice(0, 5).map((e) => ({
          score: e.score,
          total: e.totalQuestions,
          passed: e.passed,
          date: e.startedAt,
        })),
      },
      isReadyForExam,
      recommendation,
    };
  }

  private getGlobalLevel(percentage: number): string {
    if (percentage < 30) return "Débutant";
    if (percentage < 50) return "En progression";
    if (percentage < 70) return "Intermédiaire";
    if (percentage < 85) return "Avancé";
    return "Prêt pour l'examen";
  }

  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
