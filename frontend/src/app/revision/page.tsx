"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Shuffle,
  XCircle,
  Zap,
  Trophy,
  Brain,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react";

// Modes de révision (système Stych)
const revisionModes = [
  {
    id: "thematique",
    title: "Série thématique",
    description: "Révisez par thème : signalisation, priorités, sécurité...",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-500",
    href: "/revision/thematique",
  },
  {
    id: "aleatoire",
    title: "Série aléatoire",
    description: "Mix de toutes les catégories, pondéré selon vos points faibles.",
    icon: Shuffle,
    color: "bg-purple-50 text-purple-500",
    href: "/revision/aleatoire",
  },
  {
    id: "erreurs",
    title: "Mes erreurs",
    description: "Refaites les questions que vous avez ratées.",
    icon: XCircle,
    color: "bg-red-50 text-red-500",
    href: "/revision/erreurs",
  },
  {
    id: "express",
    title: "Série express",
    description: "10 questions rapides quand vous avez peu de temps.",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600",
    href: "/revision/express",
  },
  {
    id: "difficile",
    title: "Niveau difficile",
    description: "Uniquement les questions les plus complexes.",
    icon: Brain,
    color: "bg-orange-50 text-orange-500",
    href: "/revision/difficile",
  },
  {
    id: "examen",
    title: "Examen blanc",
    description: "40 questions, 30 min. Conditions réelles de l'examen.",
    icon: Trophy,
    color: "bg-green-50 text-green-500",
    href: "/examen-blanc",
  },
];

// Catégories thématiques
const themes = [
  { slug: "signalisation", title: "Signalisation routière", questions: 80, progress: 45 },
  { slug: "priorites", title: "Règles de priorité", questions: 65, progress: 30 },
  { slug: "securite", title: "Sécurité & vitesse", questions: 70, progress: 60 },
  { slug: "conduite", title: "Conduite & dépassements", questions: 60, progress: 20 },
  { slug: "visibilite", title: "Visibilité & éclairage", questions: 45, progress: 0 },
  { slug: "usagers", title: "Partage de la route", questions: 50, progress: 10 },
  { slug: "mecanique", title: "Mécanique & équipements", questions: 40, progress: 0 },
  { slug: "environnement", title: "Éco-conduite & environnement", questions: 35, progress: 0 },
  { slug: "premiers-secours", title: "Premiers secours", questions: 30, progress: 0 },
  { slug: "administratif", title: "Infractions & sanctions", questions: 35, progress: 0 },
];

// Progression simulée
const progress = {
  overall: 42,
  level: "Intermédiaire",
  totalQuestions: 156,
  correctAnswers: 112,
  streak: 5,
  recommendation: "Concentrez-vous sur les priorités et la conduite.",
};

export default function RevisionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header + progression */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Révision du code</h1>
          <p className="text-gray-600 mt-1">{progress.recommendation}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500">{progress.overall}%</div>
            <div className="text-xs text-gray-500">{progress.level}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{progress.streak}j</div>
            <div className="text-xs text-gray-500">Série</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{progress.totalQuestions}</div>
            <div className="text-xs text-gray-500">Questions faites</div>
          </div>
        </div>
      </div>

      {/* Modes de révision */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Choisissez votre mode</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {revisionModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={mode.href}
                className="card block hover:shadow-md transition-all h-full"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode.color}`}>
                    <mode.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{mode.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Séries thématiques */}
      <section>
        <h2 className="text-xl font-bold mb-4">Séries thématiques</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/revision/thematique/${theme.slug}`}
                className="card block hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{theme.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{theme.questions} questions</span>
                      <span>•</span>
                      <span
                        className={
                          theme.progress >= 70
                            ? "text-green-600"
                            : theme.progress > 0
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }
                      >
                        {theme.progress}% maîtrisé
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {/* Mini progress circle */}
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="3"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          fill="none"
                          stroke={theme.progress >= 70 ? "#22c55e" : "#2563eb"}
                          strokeWidth="3"
                          strokeDasharray={`${(theme.progress / 100) * 100.5} 100.5`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {theme.progress}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
