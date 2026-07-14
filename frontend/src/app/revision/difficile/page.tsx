"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react";

const questions = [
  { text: "Si vous doublez votre vitesse, la distance de freinage est :", answers: [{ id: "a", text: "Multipliée par 4" }, { id: "b", text: "Multipliée par 2" }, { id: "c", text: "Multipliée par 3" }, { id: "d", text: "Identique" }], correctAnswer: "a", explanation: "La distance de freinage augmente au carré de la vitesse. Vitesse x2 = freinage x4." },
  { text: "En aquaplaning, vous devez :", answers: [{ id: "a", text: "Lâcher l'accélérateur sans freiner ni tourner" }, { id: "b", text: "Freiner fort" }, { id: "c", text: "Tourner le volant" }, { id: "d", text: "Accélérer" }], correctAnswer: "a", explanation: "En aquaplaning, ne freinez pas, ne tournez pas. Lâchez juste l'accélérateur." },
  { text: "Le sous-virage est causé par :", answers: [{ id: "a", text: "Vitesse trop élevée en entrée de virage" }, { id: "b", text: "Accélération en sortie" }, { id: "c", text: "Pneus arrière usés" }, { id: "d", text: "Freinage en ligne droite" }], correctAnswer: "a", explanation: "Sous-virage = roues avant perdent l'adhérence. Trop vite à l'entrée du virage." },
  { text: "Deux véhicules face à face tournent à gauche. Ils doivent :", answers: [{ id: "a", text: "Se croiser par la droite (derrière l'autre)" }, { id: "b", text: "Se croiser par la gauche" }, { id: "c", text: "Le premier arrivé passe" }, { id: "d", text: "Priorité à droite" }], correctAnswer: "a", explanation: "Deux véhicules tournant à gauche se croisent par la droite." },
  { text: "Un rond-point SANS panneau cédez le passage à l'entrée :", answers: [{ id: "a", text: "Priorité à droite (ceux qui entrent)" }, { id: "b", text: "Ceux dedans ont la priorité" }, { id: "c", text: "Premier arrivé" }, { id: "d", text: "Pas de règle" }], correctAnswer: "a", explanation: "Sans cédez le passage, c'est la priorité à droite : ceux qui entrent passent." },
  { text: "La première pluie après une longue sécheresse est :", answers: [{ id: "a", text: "La plus dangereuse (huile + poussière)" }, { id: "b", text: "Sans danger" }, { id: "c", text: "Identique aux autres" }, { id: "d", text: "Meilleure (nettoie)" }], correctAnswer: "a", explanation: "L'huile et la poussière accumulées forment une pellicule très glissante." },
  { text: "Un garrot ne doit être posé que :", answers: [{ id: "a", text: "En dernier recours si la compression ne suffit pas" }, { id: "b", text: "Pour tout saignement" }, { id: "c", text: "Par un médecin" }, { id: "d", text: "Avant d'appeler les secours" }], correctAnswer: "a", explanation: "Le garrot est un geste de dernier recours, uniquement si la vie est en danger." },
  { text: "Un panneau bleu rond avec le chiffre 50 signifie :", answers: [{ id: "a", text: "Vitesse MINIMALE obligatoire" }, { id: "b", text: "Vitesse maximale" }, { id: "c", text: "Distance de sécurité" }, { id: "d", text: "Zone à 50m" }], correctAnswer: "a", explanation: "Fond bleu + chiffre = vitesse minimale. Vous devez rouler à au moins 50 km/h." },
  { text: "En cas de perte de freins, dans l'ordre :", answers: [{ id: "a", text: "Pomper, rétrograder, frein à main progressif" }, { id: "b", text: "Couper le moteur" }, { id: "c", text: "Sauter du véhicule" }, { id: "d", text: "Tourner à fond" }], correctAnswer: "a", explanation: "Pompez la pédale, rétrogradez pour le frein moteur, puis frein à main progressivement." },
  { text: "La flèche verte additionnelle à un feu rouge autorise :", answers: [{ id: "a", text: "Le mouvement dans cette direction uniquement" }, { id: "b", text: "De passer le rouge" }, { id: "c", text: "Les bus seulement" }, { id: "d", text: "Rien, elle est informative" }], correctAnswer: "a", explanation: "La flèche verte autorise le mouvement dans SA direction uniquement, en cédant le passage." },
];

export default function DifficilePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const currentQuestion = questions[currentIndex];
  const handleAnswer = (id: string) => { if (showResult) return; setSelectedAnswer(id); setShowResult(true); if (id === currentQuestion.correctAnswer) setScore(score + 1); };
  const handleNext = () => { if (currentIndex < questions.length - 1) { setCurrentIndex(currentIndex + 1); setSelectedAnswer(null); setShowResult(false); } else setIsFinished(true); };
  const handleRestart = () => { setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setIsFinished(false); };

  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (<div className="max-w-2xl mx-auto px-4 py-12"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center"><div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 70 ? "bg-green-50" : "bg-red-50"}`}>{pct >= 70 ? <Trophy className="w-10 h-10 text-green-500" /> : <XCircle className="w-10 h-10 text-red-500" />}</div><h2 className="text-2xl font-bold mb-2">{pct >= 70 ? "Impressionnant !" : "Difficile hein ?"}</h2><p className="text-gray-600 mb-6">Score : {score}/{questions.length} ({pct}%)</p><div className="flex gap-4 justify-center"><button onClick={handleRestart} className="btn-secondary flex items-center gap-2"><RotateCcw size={18} /> Recommencer</button><Link href="/revision" className="btn-primary">Autres modes</Link></div></motion.div></div>);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/revision" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={16} /> Retour</Link>
      <div className="mb-6 flex items-center gap-3"><Brain className="w-6 h-6 text-orange-500" /><div><h1 className="text-xl font-bold">Niveau difficile</h1><p className="text-sm text-gray-500">Questions avancées — niveau 3</p></div></div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
          <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>
          <div className="space-y-3">{currentQuestion.answers.map((a) => { let cls = "w-full text-left p-4 rounded-lg border-2 transition-all "; if (!showResult) cls += selectedAnswer === a.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-primary-300"; else if (a.id === currentQuestion.correctAnswer) cls += "border-green-500 bg-green-50"; else if (a.id === selectedAnswer) cls += "border-red-500 bg-red-50"; else cls += "border-gray-200 opacity-50"; return (<button key={a.id} onClick={() => handleAnswer(a.id)} disabled={showResult} className={cls}><div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">{a.id.toUpperCase()}</span><span className="font-medium">{a.text}</span>{showResult && a.id === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}{showResult && a.id === selectedAnswer && a.id !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}</div></button>); })}</div>
          {showResult && <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"><p className="text-sm font-semibold text-blue-800 mb-1">Explication :</p><p className="text-sm text-blue-700">{currentQuestion.explanation}</p></div>}
          {showResult && <div className="mt-6 flex justify-end"><button onClick={handleNext} className="btn-primary flex items-center gap-2">{currentIndex < questions.length - 1 ? "Suivante" : "Résultats"} <ArrowRight size={18} /></button></div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
