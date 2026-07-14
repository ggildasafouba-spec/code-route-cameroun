import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async getExams(userId?: string) {
    const exams = await this.prisma.exam.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    if (userId) {
      const attempts = await this.prisma.examAttempt.findMany({
        where: { userId },
        orderBy: { startedAt: "desc" },
      });

      return exams.map((exam) => {
        const userAttempts = attempts.filter((a) => a.examId === exam.id);
        const bestAttempt = userAttempts.length
          ? userAttempts.reduce((best, a) =>
              a.score > best.score ? a : best
            )
          : null;

        return {
          ...exam,
          attempts: userAttempts.length,
          bestScore: bestAttempt?.score || null,
          passed: bestAttempt?.passed || false,
        };
      });
    }

    return exams;
  }

  async startExam(examId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      throw new NotFoundException("Examen non trouvé");
    }

    // Sélectionner 40 questions aléatoires
    const questions = await this.prisma.question.findMany({
      where: { isPublished: true },
      include: {
        answers: { select: { id: true, text: true } },
      },
    });

    // Mélanger et prendre 40 questions
    const shuffled = questions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, exam.totalQuestions);

    return {
      examId: exam.id,
      title: exam.title,
      totalQuestions: exam.totalQuestions,
      timeLimit: exam.timeLimit,
      passingScore: exam.passingScore,
      questions: selectedQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        answers: q.answers.sort(() => Math.random() - 0.5),
      })),
    };
  }

  async submitExam(
    userId: string,
    examId: string,
    responses: { questionId: string; answerId: string }[],
    timeSpent: number
  ) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });

    if (!exam) {
      throw new NotFoundException("Examen non trouvé");
    }

    // Calculer le score
    const questionIds = responses.map((r) => r.questionId);
    const correctAnswers = await this.prisma.answer.findMany({
      where: {
        questionId: { in: questionIds },
        isCorrect: true,
      },
    });

    let score = 0;
    responses.forEach((response) => {
      const correct = correctAnswers.find(
        (a) => a.questionId === response.questionId
      );
      if (correct?.id === response.answerId) score++;
    });

    const passed = score >= exam.passingScore;

    // Sauvegarder la tentative
    const attempt = await this.prisma.examAttempt.create({
      data: {
        userId,
        examId,
        score,
        totalQuestions: responses.length,
        passed,
        timeSpent,
        completedAt: new Date(),
      },
    });

    return {
      attemptId: attempt.id,
      score,
      totalQuestions: exam.totalQuestions,
      passingScore: exam.passingScore,
      passed,
      percentage: Math.round((score / exam.totalQuestions) * 100),
      timeSpent,
    };
  }

  async getAttemptHistory(userId: string) {
    return this.prisma.examAttempt.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      include: {
        exam: { select: { title: true } },
      },
    });
  }
}
