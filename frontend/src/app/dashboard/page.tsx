"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Video,
  ClipboardCheck,
  Trophy,
  TrendingUp,
  Target,
  Clock,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  // Données simulées (en production, chargées depuis l'API)
  const stats = {
    coursCompletes: 3,
    totalCours: 7,
    qcmRealises: 12,
    scoresMoyen: 72,
    examensRealises: 2,
    meilleurScore: 85,
    tempsTotal: "4h 32min",
    streak: 5,
  };

  const recentActivities = [
    {
      type: "qcm",
      title: "QCM Signalisation #3",
      score: "8/10",
      date: "Aujourd'hui",
    },
    {
      type: "video",
      title: "Les distances de sécurité",
      score: "Terminée",
      date: "Hier",
    },
    {
      type: "examen",
      title: "Examen blanc #2",
      score: "34/40",
      date: "Il y a 2 jours",
    },
    {
      type: "cours",
      title: "Cours : Règles de priorité",
      score: "Complété",
      date: "Il y a 3 jours",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bonjour, Jean 👋</h1>
        <p className="text-gray-600 mt-1">
          Continuez votre formation. Vous êtes sur la bonne voie !
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {stats.coursCompletes}/{stats.totalCours}
              </div>
              <div className="text-xs text-gray-500">Cours complétés</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.scoresMoyen}%</div>
              <div className="text-xs text-gray-500">Score moyen</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-warning-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.qcmRealises}</div>
              <div className="text-xs text-gray-500">QCM réalisés</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.streak} j</div>
              <div className="text-xs text-gray-500">Série en cours</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Actions rapides */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Continuer la formation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/cours/priorites"
              className="card hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold">Règles de priorité</h3>
                <p className="text-sm text-gray-500">Leçon 4/8 • Reprendre</p>
              </div>
            </Link>

            <Link
              href="/qcm"
              className="card hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-success-500" />
              </div>
              <div>
                <h3 className="font-semibold">QCM du jour</h3>
                <p className="text-sm text-gray-500">
                  10 questions • Signalisation
                </p>
              </div>
            </Link>

            <Link
              href="/videos"
              className="card hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-warning-500" />
              </div>
              <div>
                <h3 className="font-semibold">Vidéo suivante</h3>
                <p className="text-sm text-gray-500">
                  Rond-points • 9:45
                </p>
              </div>
            </Link>

            <Link
              href="/examen-blanc"
              className="card hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Examen blanc</h3>
                <p className="text-sm text-gray-500">
                  40 questions • 30 min
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Activité récente */}
        <div>
          <h2 className="text-xl font-bold mb-4">Activité récente</h2>
          <div className="card">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <span className="badge-success text-xs">
                    {activity.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progression globale */}
          <div className="card mt-4">
            <h3 className="font-semibold mb-3">Progression globale</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Signalisation</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Priorités</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sécurité</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: "20%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
