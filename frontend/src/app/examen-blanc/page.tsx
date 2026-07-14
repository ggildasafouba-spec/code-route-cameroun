"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";

// Questions d'examen blanc (40 questions en production)
const examQuestions = [
  {
    id: 1,
    question: "Ce panneau triangulaire bordé de rouge avec un virage indique :",
    answers: [
      { id: "a", text: "Virage obligatoire à droite" },
      { id: "b", text: "Danger : virage dangereux à droite" },
      { id: "c", text: "Route sinueuse" },
      { id: "d", text: "Déviation à droite" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "En agglomération, la vitesse maximale autorisée est de :",
    answers: [
      { id: "a", text: "30 km/h" },
      { id: "b", text: "50 km/h" },
      { id: "c", text: "60 km/h" },
      { id: "d", text: "70 km/h" },
    ],
    correctAnswer: "c",
  },
  {
    id: 3,
    question: "Le feu orange clignotant signifie :",
    answers: [
      { id: "a", text: "Arrêt obligatoire" },
      { id: "b", text: "Ralentir et passer avec prudence" },
      { id: "c", text: "Accélérer avant que ça passe au rouge" },
      { id: "d", text: "Feu en panne, priorité à droite" },
    ],
    correctAnswer: "b",
  },
  {
    id: 4,
    question:
      "Quelle est la distance d'arrêt approximative à 60 km/h sur route sèche ?",
    answers: [
      { id: "a", text: "15 mètres" },
      { id: "b", text: "25 mètres" },
      { id: "c", text: "36 mètres" },
      { id: "d", text: "50 mètres" },
    ],
    correctAnswer: "c",
  },
  {
    id: 5,
    question: "Le port de la ceinture de sécurité est obligatoire :",
    answers: [
      { id: "a", text: "Uniquement sur autoroute" },
      { id: "b", text: "Uniquement pour le conducteur" },
      { id: "c", text: "Pour tous les occupants du véhicule" },
      { id: "d", text: "Uniquement hors agglomération" },
    ],
    correctAnswer: "c",
  },
  {
    id: 6,
    question: "Un panneau rond à fond blanc bordé de rouge indique :",
    answers: [
      { id: "a", text: "Une obligation" },
      { id: "b", text: "Une interdiction" },
      { id: "c", text: "Un danger" },
      { id: "d", text: "Une indication" },
    ],
    correctAnswer: "b",
  },
  {
    id: 7,
    question: "Vous approchez d'un passage piéton, un piéton attend. Vous devez :",
    answers: [
      { id: "a", text: "Klaxonner pour le prévenir" },
      { id: "b", text: "Accélérer pour passer vite" },
      { id: "c", text: "Vous arrêter pour le laisser traverser" },
      { id: "d", text: "Ralentir seulement s'il s'engage" },
    ],
    correctAnswer: "c",
  },
  {
    id: 8,
    question: "La nuit, en croisant un véhicule, vous devez utiliser :",
    answers: [
      { id: "a", text: "Les feux de route (pleins phares)" },
      { id: "b", text: "Les feux de croisement (codes)" },
      { id: "c", text: "Les feux de position uniquement" },
      { id: "d", text: "Les feux de brouillard" },
    ],
    correctAnswer: "b",
  },
  {
    id: 9,
    question: "Le dépassement par la droite est autorisé :",
    answers: [
      { id: "a", text: "Quand le véhicule devant roule lentement" },
      { id: "b", text: "Jamais" },
      { id: "c", text: "Quand le véhicule devant tourne à gauche" },
      { id: "d", text: "Sur autoroute uniquement" },
    ],
    correctAnswer: "c",
  },
  {
    id: 10,
    question: "Stationner sur un trottoir est :",
    answers: [
      { id: "a", text: "Autorisé si on met les warnings" },
      { id: "b", text: "Autorisé moins de 5 minutes" },
      { id: "c", text: "Interdit" },
      { id: "d", text: "Autorisé la nuit" },
    ],
    correctAnswer: "c",
  },
];

const EXAM_DURATION = 30 * 60; // 30 minutes en secondes

export default function ExamenBlancPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (!examStarted || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelectAnswer = (answerId: string) => {
    setAnswers({ ...answers, [currentIndex]: answerId });
  };

  const handleFinish = useCallback(() => {
    setIsFinished(true);
  }, []);

  const handleRestart = () => {
    setExamStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(EXAM_DURATION);
    setIsFinished(false);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return correct;
  };

  // Page d'accueil de l'examen
  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center"
        >
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Examen Blanc</h1>
          <p className="text-gray-600 mb-6">
            Testez vos connaissances dans les conditions réelles de l&apos;examen.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3">Conditions de l&apos;examen :</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-primary-500" />
                Durée : 30 minutes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-primary-500" />
                {examQuestions.length} questions à choix multiples
              </li>
              <li className="flex items-center gap-2">
                <Trophy size={16} className="text-primary-500" />
                Score minimum : 70% (
                {Math.ceil(examQuestions.length * 0.7)}/{examQuestions.length}{" "}
                bonnes réponses)
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-warning-500" />
                Vous ne pouvez pas revenir en arrière
              </li>
            </ul>
          </div>

          <button
            onClick={() => setExamStarted(true)}
            className="btn-primary text-lg px-8 py-3 flex items-center gap-2 mx-auto"
          >
            <Play size={20} />
            Commencer l&apos;examen
          </button>
        </motion.div>
      </div>
    );
  }

  // Page de résultats
  if (isFinished) {
    const score = calculateScore();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card text-center"
        >
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? "bg-success-50" : "bg-danger-50"
            }`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-success-500" />
            ) : (
              <XCircle className="w-12 h-12 text-danger-500" />
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {passed ? "Félicitations !" : "Pas encore..."}
          </h2>
          <p className="text-gray-600 mb-2">
            {passed
              ? "Vous avez réussi l'examen blanc !"
              : "Continuez à réviser, vous y êtes presque !"}
          </p>

          <div className="text-5xl font-bold my-6">
            <span className={passed ? "text-success-500" : "text-danger-500"}>
              {score}
            </span>
            <span className="text-gray-300">/{examQuestions.length}</span>
          </div>

          <div className="flex justify-center gap-8 mb-8 text-sm">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {percentage}%
              </div>
              <div className="text-gray-500">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {formatTime(EXAM_DURATION - timeLeft)}
              </div>
              <div className="text-gray-500">Temps utilisé</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {Object.keys(answers).length}
              </div>
              <div className="text-gray-500">Répondu</div>
            </div>
          </div>

          {/* Résumé des réponses */}
          <div className="grid grid-cols-10 gap-2 mb-8">
            {examQuestions.map((q, index) => {
              const isCorrect = answers[index] === q.correctAnswer;
              const wasAnswered = answers[index] !== undefined;
              return (
                <div
                  key={q.id}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    !wasAnswered
                      ? "bg-gray-200 text-gray-500"
                      : isCorrect
                      ? "bg-success-50 text-success-600"
                      : "bg-danger-50 text-danger-600"
                  }`}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Recommencer
            </button>
            <button className="btn-primary">Voir les corrections</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Examen en cours
  const currentQuestion = examQuestions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header avec timer */}
      <div className="sticky top-16 bg-gray-50 z-40 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">
            Question {currentIndex + 1}/{examQuestions.length}
          </span>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-bold ${
              timeLeft < 300
                ? "bg-danger-50 text-danger-600"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / examQuestions.length) * 100}%`,
            }}
          />
        </div>

        {/* Mini-map des questions */}
        <div className="flex gap-1 mt-3 flex-wrap">
          {examQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                index === currentIndex
                  ? "bg-primary-500 text-white"
                  : answers[index]
                  ? "bg-primary-100 text-primary-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="card mt-6"
        >
          <h2 className="text-lg font-semibold mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleSelectAnswer(answer.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentIndex] === answer.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      answers[currentIndex] === answer.id
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {answer.id.toUpperCase()}
                  </span>
                  <span className="font-medium">{answer.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="btn-secondary disabled:opacity-50"
            >
              Précédent
            </button>

            {currentIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="btn-primary"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-success-500 hover:bg-success-600 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
              >
                Terminer l&apos;examen
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
