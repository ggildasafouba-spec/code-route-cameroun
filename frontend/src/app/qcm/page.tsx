"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";

// Exemple de questions QCM (en production, chargées depuis l'API)
const sampleQuestions = [
  {
    id: 1,
    question: "Que signifie un panneau triangulaire bordé de rouge ?",
    image: null,
    answers: [
      { id: "a", text: "Un panneau d'interdiction" },
      { id: "b", text: "Un panneau de danger" },
      { id: "c", text: "Un panneau d'obligation" },
      { id: "d", text: "Un panneau d'indication" },
    ],
    correctAnswer: "b",
    explanation:
      "Les panneaux triangulaires bordés de rouge sont des panneaux de danger. Ils avertissent le conducteur d'un danger potentiel sur la route.",
    category: "Signalisation",
  },
  {
    id: 2,
    question:
      "À une intersection sans signalisation, quelle est la règle de priorité ?",
    image: null,
    answers: [
      { id: "a", text: "Priorité à gauche" },
      { id: "b", text: "Priorité au premier arrivé" },
      { id: "c", text: "Priorité à droite" },
      { id: "d", text: "Pas de règle, il faut klaxonner" },
    ],
    correctAnswer: "c",
    explanation:
      "En l'absence de toute signalisation, c'est la règle de la priorité à droite qui s'applique. Le véhicule venant de droite a toujours la priorité.",
    category: "Priorités",
  },
  {
    id: 3,
    question: "Quelle est la distance minimale de sécurité sur autoroute ?",
    image: null,
    answers: [
      { id: "a", text: "50 mètres" },
      { id: "b", text: "2 secondes ou la distance entre 2 lignes blanches" },
      { id: "c", text: "10 mètres" },
      { id: "d", text: "Il n'y a pas de distance minimale" },
    ],
    correctAnswer: "b",
    explanation:
      "La distance de sécurité minimale est de 2 secondes, ce qui correspond à la distance entre 2 bandes blanches sur l'autoroute (environ 90m à 130 km/h).",
    category: "Sécurité",
  },
  {
    id: 4,
    question: "Un panneau rond à fond bleu indique :",
    image: null,
    answers: [
      { id: "a", text: "Une interdiction" },
      { id: "b", text: "Un danger" },
      { id: "c", text: "Une obligation" },
      { id: "d", text: "Une indication" },
    ],
    correctAnswer: "c",
    explanation:
      "Les panneaux ronds à fond bleu sont des panneaux d'obligation. Ils indiquent une action que le conducteur doit obligatoirement effectuer.",
    category: "Signalisation",
  },
  {
    id: 5,
    question:
      "Quel est le taux d'alcoolémie maximum autorisé au volant au Cameroun ?",
    image: null,
    answers: [
      { id: "a", text: "0,0 g/l" },
      { id: "b", text: "0,5 g/l" },
      { id: "c", text: "0,8 g/l" },
      { id: "d", text: "1,0 g/l" },
    ],
    correctAnswer: "c",
    explanation:
      "Au Cameroun, le taux d'alcoolémie maximum autorisé est de 0,8 g/l de sang. Au-delà, vous êtes en infraction et risquez des sanctions pénales.",
    category: "Sécurité",
  },
];

export default function QCMPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = sampleQuestions[currentIndex];

  const handleAnswer = (answerId: string) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
    setShowResult(true);
    if (answerId === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card text-center"
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? "bg-success-50" : "bg-danger-50"
            }`}
          >
            {passed ? (
              <CheckCircle className="w-10 h-10 text-success-500" />
            ) : (
              <XCircle className="w-10 h-10 text-danger-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {passed ? "Bravo !" : "Continuez vos efforts !"}
          </h2>
          <p className="text-gray-600 mb-6">
            Vous avez obtenu {score}/{sampleQuestions.length} ({percentage}%)
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRestart} className="btn-secondary flex items-center gap-2">
              <RotateCcw size={18} />
              Recommencer
            </button>
            <button className="btn-primary">Série suivante</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1}/{sampleQuestions.length}
          </span>
          <span className="badge-success">{currentQuestion.category}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / sampleQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answers */}
          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => {
              let className =
                "w-full text-left p-4 rounded-lg border-2 transition-all ";
              if (!showResult) {
                className +=
                  selectedAnswer === answer.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-primary-300 hover:bg-primary-50/50";
              } else if (answer.id === currentQuestion.correctAnswer) {
                className += "border-success-500 bg-success-50";
              } else if (
                answer.id === selectedAnswer &&
                answer.id !== currentQuestion.correctAnswer
              ) {
                className += "border-danger-500 bg-danger-50";
              } else {
                className += "border-gray-200 opacity-50";
              }

              return (
                <button
                  key={answer.id}
                  onClick={() => handleAnswer(answer.id)}
                  disabled={showResult}
                  className={className}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                      {answer.id.toUpperCase()}
                    </span>
                    <span className="font-medium">{answer.text}</span>
                    {showResult &&
                      answer.id === currentQuestion.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-success-500 ml-auto" />
                      )}
                    {showResult &&
                      answer.id === selectedAnswer &&
                      answer.id !== currentQuestion.correctAnswer && (
                        <XCircle className="w-5 h-5 text-danger-500 ml-auto" />
                      )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-sm font-semibold text-blue-800 mb-1">
                Explication :
              </p>
              <p className="text-sm text-blue-700">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Next button */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                {currentIndex < sampleQuestions.length - 1
                  ? "Question suivante"
                  : "Voir les résultats"}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
