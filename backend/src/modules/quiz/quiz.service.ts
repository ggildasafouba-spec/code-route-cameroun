// @ts-nocheck
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.quizCategory.findMany({
      include: {
        _count: { select: { questions: true } },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      totalQuestions: cat._count.questions,
    }));
  }

  /**
   * Soumettre les réponses et retourner les corrections complètes
   * Système inspiré de Stych : correction immédiate avec explication
   */
  async submitQuizResponses(
    userId: string,
    responses: { questionId: string; answerId: string }[],
    timeSpent?: number,
    mode?: string
  ) {
    // Récupérer les bonnes réponses
    const questionIds = responses.map((r) => r.questionId);

    const questions = await this.prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: {
        answers: true,
        category: { select: { title: true, slug: true } },
      },
    });

    // Calculer le score et préparer les corrections
    let score = 0;
    const corrections = questions.map((question) => {
      const userResponse = responses.find((r) => r.questionId === question.id);
      const correctAnswer = question.answers.find((a) => a.isCorrect);
      const isCorrect = userResponse?.answerId === correctAnswer?.id;

      if (isCorrect) score++;

      return {
        questionId: question.id,
        text: question.text,
        image: question.image,
        category: question.category.title,
        difficulty: question.difficulty,
        explanation: question.explanation,
        isCorrect,
        userAnswer: {
          id: userResponse?.answerId,
          text: question.answers.find((a) => a.id === userResponse?.answerId)?.text,
        },
        correctAnswer: {
          id: correctAnswer?.id,
          text: correctAnswer?.text,
        },
        allAnswers: question.answers.map((a) => ({
          id: a.id,
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      };
    });

    // Sauvegarder la tentative (créer un quiz temporaire si nécessaire)
    let quiz = await this.prisma.quiz.findFirst({
      where: { title: `Serie_${mode || "aleatoire"}_auto` },
    });

    if (!quiz) {
      quiz = await this.prisma.quiz.create({
        data: {
          title: `Serie_${mode || "aleatoire"}_auto`,
          totalQuestions: responses.length,
        },
      });
    }

    const attempt = await this.prisma.quizAttempt.create({
      data: {
        userId,
        quizId: quiz.id,
        score,
        totalQuestions: responses.length,
        timeSpent,
        completedAt: new Date(),
        responses: {
          create: corrections.map((c) => ({
            questionId: c.questionId,
            answerId: c.userAnswer.id || "",
            isCorrect: c.isCorrect,
          })),
        },
      },
    });

    // Analyser les résultats par catégorie
    const categoryResults: Record<string, { correct: number; total: number }> = {};
    corrections.forEach((c) => {
      if (!categoryResults[c.category]) {
        categoryResults[c.category] = { correct: 0, total: 0 };
      }
      categoryResults[c.category].total++;
      if (c.isCorrect) categoryResults[c.category].correct++;
    });

    const percentage = Math.round((score / responses.length) * 100);
    const passed = percentage >= 70;

    return {
      attemptId: attempt.id,
      score,
      totalQuestions: responses.length,
      percentage,
      passed,
      timeSpent,

      // Résumé par catégorie
      categoryBreakdown: Object.entries(categoryResults).map(([cat, stats]) => ({
        category: cat,
        correct: stats.correct,
        total: stats.total,
        percentage: Math.round((stats.correct / stats.total) * 100),
      })),

      // Corrections détaillées (comme Stych)
      corrections: corrections.map((c) => ({
        questionId: c.questionId,
        text: c.text,
        image: c.image,
        isCorrect: c.isCorrect,
        explanation: c.explanation,
        userAnswer: c.userAnswer,
        correctAnswer: c.correctAnswer,
      })),

      // Feedback personnalisé
      feedback: this.generateFeedback(percentage, categoryResults),
    };
  }

  private generateFeedback(
    percentage: number,
    categoryResults: Record<string, { correct: number; total: number }>
  ): string {
    if (percentage >= 90) {
      return "Excellent ! Vous maîtrisez parfaitement ce sujet.";
    }
    if (percentage >= 70) {
      const weakCategories = Object.entries(categoryResults)
        .filter(([, stats]) => stats.correct / stats.total < 0.7)
        .map(([cat]) => cat);

      if (weakCategories.length > 0) {
        return `Bon travail ! Révisez encore : ${weakCategories.join(", ")}.`;
      }
      return "Bon résultat ! Continuez ainsi.";
    }
    if (percentage >= 50) {
      return "Résultat moyen. Révisez les corrections et refaites une série.";
    }
    return "Il faut encore travailler. Relisez les cours sur les thèmes ratés et refaites cette série.";
  }
}
