"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
} from "lucide-react";

// Questions simulées par thème (en production, chargées depuis l'API)
const questionsBank: Record<string, { text: string; answers: { id: string; text: string }[]; correctAnswer: string; explanation: string }[]> = {
  signalisation: [
    { text: "Un panneau triangulaire bordé de rouge indique :", answers: [{ id: "a", text: "Un danger" }, { id: "b", text: "Une interdiction" }, { id: "c", text: "Une obligation" }, { id: "d", text: "Une indication" }], correctAnswer: "a", explanation: "Les panneaux triangulaires bordés de rouge sont des panneaux de danger." },
    { text: "Un panneau rond à fond bleu indique :", answers: [{ id: "a", text: "Une obligation" }, { id: "b", text: "Une interdiction" }, { id: "c", text: "Un danger" }, { id: "d", text: "Une fin de prescription" }], correctAnswer: "a", explanation: "Les panneaux ronds à fond bleu sont des panneaux d'obligation." },
    { text: "Un panneau rond à fond blanc bordé de rouge indique :", answers: [{ id: "a", text: "Une interdiction" }, { id: "b", text: "Une obligation" }, { id: "c", text: "Un danger" }, { id: "d", text: "Une indication" }], correctAnswer: "a", explanation: "Les panneaux ronds à fond blanc bordé de rouge sont des panneaux d'interdiction." },
    { text: "Le panneau STOP oblige à :", answers: [{ id: "a", text: "S'arrêter et céder le passage" }, { id: "b", text: "Ralentir seulement" }, { id: "c", text: "Klaxonner" }, { id: "d", text: "Accélérer" }], correctAnswer: "a", explanation: "Le STOP impose un arrêt absolu puis de céder le passage." },
    { text: "Un feu orange fixe signifie :", answers: [{ id: "a", text: "Arrêtez-vous sauf si c'est dangereux" }, { id: "b", text: "Accélérez pour passer" }, { id: "c", text: "Passez avec prudence" }, { id: "d", text: "Feu en panne" }], correctAnswer: "a", explanation: "Le feu orange annonce le rouge. Arrêtez-vous sauf si l'arrêt est dangereux." },
    { text: "La ligne continue blanche interdit de :", answers: [{ id: "a", text: "La franchir ou la chevaucher" }, { id: "b", text: "Stationner" }, { id: "c", text: "Klaxonner" }, { id: "d", text: "Rouler dessus" }], correctAnswer: "a", explanation: "La ligne continue interdit tout franchissement et chevauchement." },
    { text: "Un panneau triangulaire avec des enfants signifie :", answers: [{ id: "a", text: "Zone scolaire, ralentir" }, { id: "b", text: "Aire de jeux" }, { id: "c", text: "Passage piéton" }, { id: "d", text: "Crèche" }], correctAnswer: "a", explanation: "Proximité d'une école. Vitesse limitée à 30 km/h au Cameroun." },
    { text: "Le panneau sens interdit est :", answers: [{ id: "a", text: "Rond, fond rouge, barre blanche" }, { id: "b", text: "Triangulaire rouge" }, { id: "c", text: "Carré bleu" }, { id: "d", text: "Rond blanc avec croix" }], correctAnswer: "a", explanation: "Le sens interdit est un panneau rond à fond rouge avec une barre blanche horizontale." },
    { text: "Un feu rouge clignotant signifie :", answers: [{ id: "a", text: "Arrêt obligatoire absolu" }, { id: "b", text: "Ralentir" }, { id: "c", text: "Feu en panne" }, { id: "d", text: "Passer vite" }], correctAnswer: "a", explanation: "Le feu rouge clignotant impose un arrêt absolu (passage à niveau, caserne)." },
    { text: "Un panneau carré bleu avec un P signifie :", answers: [{ id: "a", text: "Parking autorisé" }, { id: "b", text: "Poste de police" }, { id: "c", text: "Péage" }, { id: "d", text: "Priorité" }], correctAnswer: "a", explanation: "Le P sur fond bleu indique un stationnement autorisé." },
  ],
  priorites: [
    { text: "À une intersection sans signalisation :", answers: [{ id: "a", text: "Priorité à droite" }, { id: "b", text: "Priorité au premier arrivé" }, { id: "c", text: "Priorité au plus rapide" }, { id: "d", text: "Pas de règle" }], correctAnswer: "a", explanation: "Sans signalisation, la priorité à droite s'applique." },
    { text: "Dans un rond-point, qui a la priorité ?", answers: [{ id: "a", text: "Ceux déjà dans le rond-point" }, { id: "b", text: "Ceux qui entrent" }, { id: "c", text: "Priorité à droite" }, { id: "d", text: "Le plus rapide" }], correctAnswer: "a", explanation: "Les véhicules dans le giratoire ont la priorité sur ceux qui entrent." },
    { text: "Un agent de police prime sur les feux ?", answers: [{ id: "a", text: "Oui, toujours" }, { id: "b", text: "Non, le feu prime" }, { id: "c", text: "Seulement la nuit" }, { id: "d", text: "Ça dépend" }], correctAnswer: "a", explanation: "L'agent prime toujours sur les feux tricolores et les panneaux." },
    { text: "Vous sortez d'un parking. Vous avez la priorité ?", answers: [{ id: "a", text: "Non, je cède à tous" }, { id: "b", text: "Oui sur les piétons" }, { id: "c", text: "Oui à droite" }, { id: "d", text: "Oui toujours" }], correctAnswer: "a", explanation: "En sortant d'un lieu privé, vous n'avez aucune priorité." },
    { text: "Un véhicule d'urgence avec sirène arrive. Vous devez :", answers: [{ id: "a", text: "Vous ranger à droite" }, { id: "b", text: "Accélérer" }, { id: "c", text: "Continuer" }, { id: "d", text: "Klaxonner" }], correctAnswer: "a", explanation: "Rangez-vous à droite pour laisser passer le véhicule prioritaire." },
    { text: "Le feu passe au vert mais un piéton traverse encore :", answers: [{ id: "a", text: "Attendre qu'il finisse" }, { id: "b", text: "Klaxonner" }, { id: "c", text: "Le contourner" }, { id: "d", text: "Avancer doucement" }], correctAnswer: "a", explanation: "Un piéton engagé a toujours la priorité, même au feu vert pour vous." },
    { text: "Qui doit céder quand on tourne à gauche ?", answers: [{ id: "a", text: "Celui qui tourne à gauche" }, { id: "b", text: "Celui en face" }, { id: "c", text: "Le premier arrivé" }, { id: "d", text: "Personne" }], correctAnswer: "a", explanation: "Celui qui tourne à gauche doit céder au véhicule en face allant tout droit." },
    { text: "Un losange jaune sur votre route signifie :", answers: [{ id: "a", text: "Vous êtes sur route prioritaire" }, { id: "b", text: "Zone dangereuse" }, { id: "c", text: "Zone 30" }, { id: "d", text: "Parking" }], correctAnswer: "a", explanation: "Le losange jaune indique que vous êtes sur une route prioritaire." },
  ],
  securite: [
    { text: "Vitesse max en agglomération au Cameroun :", answers: [{ id: "a", text: "60 km/h" }, { id: "b", text: "50 km/h" }, { id: "c", text: "80 km/h" }, { id: "d", text: "40 km/h" }], correctAnswer: "a", explanation: "60 km/h est la limite en agglomération au Cameroun." },
    { text: "Vitesse max hors agglomération au Cameroun :", answers: [{ id: "a", text: "110 km/h" }, { id: "b", text: "90 km/h" }, { id: "c", text: "130 km/h" }, { id: "d", text: "100 km/h" }], correctAnswer: "a", explanation: "110 km/h hors agglomération au Cameroun." },
    { text: "Taux d'alcoolémie max au Cameroun :", answers: [{ id: "a", text: "0,8 g/l" }, { id: "b", text: "0,5 g/l" }, { id: "c", text: "0,2 g/l" }, { id: "d", text: "1,0 g/l" }], correctAnswer: "a", explanation: "Le taux max est de 0,8 g/l de sang au Cameroun." },
    { text: "La distance de sécurité correspond à :", answers: [{ id: "a", text: "2 secondes minimum" }, { id: "b", text: "5 mètres" }, { id: "c", text: "1 seconde" }, { id: "d", text: "10 mètres" }], correctAnswer: "a", explanation: "Minimum 2 secondes de distance avec le véhicule précédent." },
    { text: "Sur route mouillée, la distance de freinage est :", answers: [{ id: "a", text: "Multipliée par 2" }, { id: "b", text: "Identique" }, { id: "c", text: "Multipliée par 1,5" }, { id: "d", text: "Réduite" }], correctAnswer: "a", explanation: "Sur route mouillée, la distance de freinage double." },
    { text: "Le port de la ceinture est obligatoire pour :", answers: [{ id: "a", text: "Tous les occupants" }, { id: "b", text: "Le conducteur seul" }, { id: "c", text: "Devant seulement" }, { id: "d", text: "Sur autoroute" }], correctAnswer: "a", explanation: "Obligatoire pour tous : conducteur et passagers, avant et arrière." },
    { text: "Le téléphone au volant est :", answers: [{ id: "a", text: "Strictement interdit" }, { id: "b", text: "Autorisé au feu rouge" }, { id: "c", text: "Autorisé main libre" }, { id: "d", text: "Toléré" }], correctAnswer: "a", explanation: "Le téléphone tenu en main au volant est strictement interdit." },
    { text: "Le meilleur remède contre la somnolence est :", answers: [{ id: "a", text: "S'arrêter et dormir 20 min" }, { id: "b", text: "Boire du café" }, { id: "c", text: "Ouvrir la fenêtre" }, { id: "d", text: "Mettre la musique" }], correctAnswer: "a", explanation: "Seul le sommeil combat la somnolence. Faites une sieste de 20 min." },
  ],
};

// Fallback pour les catégories sans questions spécifiques
const defaultQuestions = questionsBank.signalisation;

export default function RevisionThematiquePage() {
  const params = useParams();
  const slug = params.slug as string;

  const questions = questionsBank[slug] || defaultQuestions;
  const categoryNames: Record<string, string> = {
    signalisation: "Signalisation routière",
    priorites: "Règles de priorité",
    securite: "Sécurité & vitesse",
    conduite: "Conduite & dépassements",
    visibilite: "Visibilité & éclairage",
    usagers: "Partage de la route",
    mecanique: "Mécanique & équipements",
    environnement: "Éco-conduite",
    "premiers-secours": "Premiers secours",
    administratif: "Infractions & administratif",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answerId: string) => {
    if (showResult) return;
    setSelectedAnswer(answerId);
    setShowResult(true);
    if (answerId === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
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
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? "bg-green-50" : "bg-red-50"}`}>
            {passed ? <Trophy className="w-10 h-10 text-green-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
          </div>
          <h2 className="text-2xl font-bold mb-2">{passed ? "Bravo !" : "Continuez !"}</h2>
          <p className="text-gray-600 mb-6">Score : {score}/{questions.length} ({percentage}%)</p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRestart} className="btn-secondary flex items-center gap-2"><RotateCcw size={18} /> Recommencer</button>
            <Link href="/revision" className="btn-primary">Autres séries</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/cours" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft size={16} /> Retour
      </Link>

      <div className="mb-6">
        <h1 className="text-xl font-bold">{categoryNames[slug] || "Révision"}</h1>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Question {currentIndex + 1}/{questions.length}</span>
          <span className="font-medium text-primary-600">{score} bonne{score > 1 ? "s" : ""} réponse{score > 1 ? "s" : ""}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
          <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.answers.map((answer) => {
              let cls = "w-full text-left p-4 rounded-lg border-2 transition-all ";
              if (!showResult) {
                cls += selectedAnswer === answer.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-primary-300";
              } else if (answer.id === currentQuestion.correctAnswer) {
                cls += "border-green-500 bg-green-50";
              } else if (answer.id === selectedAnswer && answer.id !== currentQuestion.correctAnswer) {
                cls += "border-red-500 bg-red-50";
              } else {
                cls += "border-gray-200 opacity-50";
              }
              return (
                <button key={answer.id} onClick={() => handleAnswer(answer.id)} disabled={showResult} className={cls}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">{answer.id.toUpperCase()}</span>
                    <span className="font-medium">{answer.text}</span>
                    {showResult && answer.id === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    {showResult && answer.id === selectedAnswer && answer.id !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-1">Explication :</p>
              <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {showResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
              <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                {currentIndex < questions.length - 1 ? "Suivante" : "Résultats"} <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
