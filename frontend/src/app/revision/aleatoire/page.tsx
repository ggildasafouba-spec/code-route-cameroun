"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

const questions = [
  { text: "Un panneau triangulaire bordé de rouge indique :", answers: [{ id: "a", text: "Un danger" }, { id: "b", text: "Une interdiction" }, { id: "c", text: "Une obligation" }, { id: "d", text: "Une indication" }], correctAnswer: "a", explanation: "Les panneaux triangulaires bordés de rouge sont des panneaux de danger." },
  { text: "À une intersection sans signalisation :", answers: [{ id: "a", text: "Priorité à droite" }, { id: "b", text: "Premier arrivé" }, { id: "c", text: "Le plus rapide" }, { id: "d", text: "Pas de règle" }], correctAnswer: "a", explanation: "Sans signalisation, la priorité à droite s'applique." },
  { text: "Vitesse max en agglomération au Cameroun :", answers: [{ id: "a", text: "60 km/h" }, { id: "b", text: "50 km/h" }, { id: "c", text: "80 km/h" }, { id: "d", text: "40 km/h" }], correctAnswer: "a", explanation: "60 km/h est la limite en agglomération au Cameroun." },
  { text: "La distance de sécurité = :", answers: [{ id: "a", text: "2 secondes minimum" }, { id: "b", text: "5 mètres" }, { id: "c", text: "1 seconde" }, { id: "d", text: "La longueur du véhicule" }], correctAnswer: "a", explanation: "Minimum 2 secondes avec le véhicule qui précède." },
  { text: "Le dépassement par la droite est autorisé quand :", answers: [{ id: "a", text: "Le véhicule devant tourne à gauche" }, { id: "b", text: "Jamais" }, { id: "c", text: "Sur autoroute" }, { id: "d", text: "La nuit" }], correctAnswer: "a", explanation: "Autorisé quand le véhicule devant signale qu'il tourne à gauche." },
  { text: "Le port de la ceinture est obligatoire :", answers: [{ id: "a", text: "Pour tous les occupants" }, { id: "b", text: "Conducteur seul" }, { id: "c", text: "Devant seulement" }, { id: "d", text: "Sur autoroute" }], correctAnswer: "a", explanation: "Obligatoire pour tous : conducteur et passagers." },
  { text: "Un feu orange clignotant signifie :", answers: [{ id: "a", text: "Prudence, priorité à droite" }, { id: "b", text: "Arrêt obligatoire" }, { id: "c", text: "Feu en panne" }, { id: "d", text: "Priorité totale" }], correctAnswer: "a", explanation: "Feu orange clignotant = prudence et règles de priorité." },
  { text: "Taux d'alcoolémie max au Cameroun :", answers: [{ id: "a", text: "0,8 g/l" }, { id: "b", text: "0,5 g/l" }, { id: "c", text: "0 g/l" }, { id: "d", text: "1 g/l" }], correctAnswer: "a", explanation: "0,8 g/l de sang au Cameroun." },
  { text: "L'ABS permet de :", answers: [{ id: "a", text: "Garder le contrôle de la direction en freinant" }, { id: "b", text: "Freiner plus court" }, { id: "c", text: "Freiner automatiquement" }, { id: "d", text: "Éviter l'aquaplaning" }], correctAnswer: "a", explanation: "L'ABS empêche le blocage des roues pour garder la direction." },
  { text: "Les pneus doivent avoir une sculpture d'au moins :", answers: [{ id: "a", text: "1,6 mm" }, { id: "b", text: "3 mm" }, { id: "c", text: "0,5 mm" }, { id: "d", text: "5 mm" }], correctAnswer: "a", explanation: "Minimum légal : 1,6 mm de profondeur de sculpture." },
  { text: "Stationner sur un trottoir est :", answers: [{ id: "a", text: "Interdit" }, { id: "b", text: "Autorisé avec warnings" }, { id: "c", text: "Autorisé < 5 min" }, { id: "d", text: "Autorisé la nuit" }], correctAnswer: "a", explanation: "Le trottoir est réservé aux piétons. Stationnement interdit." },
  { text: "Face à un piéton aveugle (canne blanche) :", answers: [{ id: "a", text: "S'arrêter et le laisser traverser" }, { id: "b", text: "Klaxonner" }, { id: "c", text: "Passer derrière lui" }, { id: "d", text: "Continuer" }], correctAnswer: "a", explanation: "Une personne aveugle a toujours la priorité." },
  { text: "Le triangle doit être posé à :", answers: [{ id: "a", text: "Au moins 30 mètres du véhicule" }, { id: "b", text: "5 mètres" }, { id: "c", text: "Juste derrière" }, { id: "d", text: "100 mètres" }], correctAnswer: "a", explanation: "Le triangle de présignalisation se place à 30m minimum." },
  { text: "Sur route mouillée, la distance de freinage :", answers: [{ id: "a", text: "Double" }, { id: "b", text: "Reste identique" }, { id: "c", text: "Triple" }, { id: "d", text: "Diminue" }], correctAnswer: "a", explanation: "Sur route mouillée, la distance de freinage est multipliée par 2." },
  { text: "Premiers secours : P.A.S signifie :", answers: [{ id: "a", text: "Protéger, Alerter, Secourir" }, { id: "b", text: "Partir, Appeler, Soigner" }, { id: "c", text: "Prévenir, Aider, Sauver" }, { id: "d", text: "Patienter, Attendre, Signaler" }], correctAnswer: "a", explanation: "P.A.S = Protéger les lieux, Alerter les secours, Secourir les victimes." },
  { text: "La conduite avec le téléphone en main :", answers: [{ id: "a", text: "Est strictement interdite" }, { id: "b", text: "Est autorisée au feu rouge" }, { id: "c", text: "Est tolérée en ville" }, { id: "d", text: "N'est pas dangereuse" }], correctAnswer: "a", explanation: "Téléphone en main = interdit en toute circonstance." },
  { text: "Un ballon roule sur la route, vous devez :", answers: [{ id: "a", text: "Freiner, un enfant peut suivre" }, { id: "b", text: "L'éviter par la gauche" }, { id: "c", text: "Continuer" }, { id: "d", text: "Klaxonner" }], correctAnswer: "a", explanation: "Ballon = enfant possible derrière. Freinez immédiatement." },
  { text: "En descente, le frein moteur sert à :", answers: [{ id: "a", text: "Ralentir sans user les freins" }, { id: "b", text: "Accélérer" }, { id: "c", text: "Rien" }, { id: "d", text: "Économiser du carburant" }], correctAnswer: "a", explanation: "Le frein moteur ralentit sans surchauffer les freins en descente." },
  { text: "L'éco-conduite consiste à :", answers: [{ id: "a", text: "Conduire souplement pour économiser" }, { id: "b", text: "Rouler très lentement" }, { id: "c", text: "Ne jamais utiliser la clim" }, { id: "d", text: "Rouler au point mort" }], correctAnswer: "a", explanation: "Conduite souple = moins de carburant, moins de pollution." },
  { text: "Le numéro d'urgence au Cameroun :", answers: [{ id: "a", text: "117 (police) / 118 (gendarmerie)" }, { id: "b", text: "911" }, { id: "c", text: "15" }, { id: "d", text: "18" }], correctAnswer: "a", explanation: "117 pour la police, 118 pour la gendarmerie au Cameroun." },
];

export default function AleatoirePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answerId: string) => { if (showResult) return; setSelectedAnswer(answerId); setShowResult(true); if (answerId === currentQuestion.correctAnswer) setScore(score + 1); };
  const handleNext = () => { if (currentIndex < questions.length - 1) { setCurrentIndex(currentIndex + 1); setSelectedAnswer(null); setShowResult(false); } else { setIsFinished(true); } };
  const handleRestart = () => { setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setIsFinished(false); };

  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 70 ? "bg-green-50" : "bg-red-50"}`}>
            {pct >= 70 ? <Trophy className="w-10 h-10 text-green-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
          </div>
          <h2 className="text-2xl font-bold mb-2">{pct >= 70 ? "Bravo !" : "Continuez !"}</h2>
          <p className="text-gray-600 mb-6">Score : {score}/{questions.length} ({pct}%)</p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRestart} className="btn-secondary flex items-center gap-2"><RotateCcw size={18} /> Recommencer</button>
            <Link href="/revision" className="btn-primary">Autres modes</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/revision" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={16} /> Retour</Link>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Série aléatoire</h1>
        <div className="flex justify-between text-sm text-gray-500 mt-2"><span>Question {currentIndex + 1}/{questions.length}</span><span className="font-medium text-primary-600">{score} correcte{score > 1 ? "s" : ""}</span></div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
          <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.answers.map((a) => {
              let cls = "w-full text-left p-4 rounded-lg border-2 transition-all ";
              if (!showResult) cls += selectedAnswer === a.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-primary-300";
              else if (a.id === currentQuestion.correctAnswer) cls += "border-green-500 bg-green-50";
              else if (a.id === selectedAnswer) cls += "border-red-500 bg-red-50";
              else cls += "border-gray-200 opacity-50";
              return (<button key={a.id} onClick={() => handleAnswer(a.id)} disabled={showResult} className={cls}><div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">{a.id.toUpperCase()}</span><span className="font-medium">{a.text}</span>{showResult && a.id === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}{showResult && a.id === selectedAnswer && a.id !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}</div></button>);
            })}
          </div>
          {showResult && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"><p className="text-sm font-semibold text-blue-800 mb-1">Explication :</p><p className="text-sm text-blue-700">{currentQuestion.explanation}</p></motion.div>}
          {showResult && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end"><button onClick={handleNext} className="btn-primary flex items-center gap-2">{currentIndex < questions.length - 1 ? "Suivante" : "Résultats"} <ArrowRight size={18} /></button></motion.div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
