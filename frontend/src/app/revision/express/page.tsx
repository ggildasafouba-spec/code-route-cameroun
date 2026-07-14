"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy, Zap } from "lucide-react";

const questions = [
  { text: "Vitesse max en agglomération au Cameroun :", answers: [{ id: "a", text: "60 km/h" }, { id: "b", text: "50 km/h" }, { id: "c", text: "80 km/h" }, { id: "d", text: "40 km/h" }], correctAnswer: "a", explanation: "60 km/h en agglomération au Cameroun." },
  { text: "Priorité à droite s'applique quand :", answers: [{ id: "a", text: "Pas de signalisation" }, { id: "b", text: "Toujours" }, { id: "c", text: "Sur autoroute" }, { id: "d", text: "Jamais" }], correctAnswer: "a", explanation: "Sans signalisation, priorité à droite." },
  { text: "La ceinture est obligatoire pour :", answers: [{ id: "a", text: "Tous les occupants" }, { id: "b", text: "Le conducteur" }, { id: "c", text: "Personne" }, { id: "d", text: "L'avant" }], correctAnswer: "a", explanation: "Tous les occupants doivent porter la ceinture." },
  { text: "Distance de sécurité = :", answers: [{ id: "a", text: "2 secondes" }, { id: "b", text: "1 mètre" }, { id: "c", text: "5 mètres" }, { id: "d", text: "10 mètres" }], correctAnswer: "a", explanation: "2 secondes minimum avec le véhicule devant." },
  { text: "Panneau STOP oblige à :", answers: [{ id: "a", text: "S'arrêter et céder" }, { id: "b", text: "Ralentir" }, { id: "c", text: "Klaxonner" }, { id: "d", text: "Accélérer" }], correctAnswer: "a", explanation: "STOP = arrêt obligatoire + céder le passage." },
  { text: "Alcoolémie max au Cameroun :", answers: [{ id: "a", text: "0,8 g/l" }, { id: "b", text: "0,5 g/l" }, { id: "c", text: "0 g/l" }, { id: "d", text: "1 g/l" }], correctAnswer: "a", explanation: "0,8 g/l maximum au Cameroun." },
  { text: "Téléphone au volant :", answers: [{ id: "a", text: "Interdit" }, { id: "b", text: "Autorisé" }, { id: "c", text: "Toléré" }, { id: "d", text: "Au feu rouge" }], correctAnswer: "a", explanation: "Strictement interdit en toute circonstance." },
  { text: "Panneau rond bleu = :", answers: [{ id: "a", text: "Obligation" }, { id: "b", text: "Interdiction" }, { id: "c", text: "Danger" }, { id: "d", text: "Indication" }], correctAnswer: "a", explanation: "Rond bleu = panneau d'obligation." },
  { text: "Route mouillée : freinage :", answers: [{ id: "a", text: "Distance x2" }, { id: "b", text: "Identique" }, { id: "c", text: "Distance x0.5" }, { id: "d", text: "Distance x3" }], correctAnswer: "a", explanation: "La distance de freinage double sur route mouillée." },
  { text: "Urgence Cameroun :", answers: [{ id: "a", text: "117 / 118" }, { id: "b", text: "911" }, { id: "c", text: "112" }, { id: "d", text: "15" }], correctAnswer: "a", explanation: "117 (police) et 118 (gendarmerie) au Cameroun." },
];

export default function ExpressPage() {
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
    return (<div className="max-w-2xl mx-auto px-4 py-12"><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center"><div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 70 ? "bg-green-50" : "bg-red-50"}`}>{pct >= 70 ? <Trophy className="w-10 h-10 text-green-500" /> : <XCircle className="w-10 h-10 text-red-500" />}</div><h2 className="text-2xl font-bold mb-2">{pct >= 70 ? "Bravo !" : "À retravailler"}</h2><p className="text-gray-600 mb-6">Score : {score}/{questions.length} ({pct}%)</p><div className="flex gap-4 justify-center"><button onClick={handleRestart} className="btn-secondary flex items-center gap-2"><RotateCcw size={18} /> Recommencer</button><Link href="/revision" className="btn-primary">Autres modes</Link></div></motion.div></div>);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/revision" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={16} /> Retour</Link>
      <div className="mb-6 flex items-center gap-3"><Zap className="w-6 h-6 text-yellow-500" /><div><h1 className="text-xl font-bold">Série express</h1><p className="text-sm text-gray-500">10 questions rapides</p></div></div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div>
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
