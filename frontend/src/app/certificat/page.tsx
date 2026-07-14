"use client";

import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  XCircle,
  Download,
  BookOpen,
  Video,
  Trophy,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Données simulées (en production, chargées depuis l'API)
const eligibility = {
  isEligible: false,
  criteria: {
    coursesCompleted: {
      current: 75,
      required: 100,
      met: false,
      label: "Cours complétés",
    },
    videosWatched: {
      current: 85,
      required: 80,
      met: true,
      label: "Vidéos regardées",
    },
    examsPassed: {
      current: 2,
      required: 3,
      met: false,
      label: "Examens blancs réussis (≥70%)",
    },
    averageScore: {
      current: 82,
      required: 80,
      met: true,
      label: "Score moyen aux examens",
    },
  },
};

const criteriaIcons: Record<string, any> = {
  coursesCompleted: BookOpen,
  videosWatched: Video,
  examsPassed: Trophy,
  averageScore: TrendingUp,
};

export default function CertificatPage() {
  const { isEligible, criteria } = eligibility;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Certificat de formation</h1>
        <p className="text-gray-600">
          Validez tous les critères pour obtenir votre certificat et vous
          inscrire à l&apos;examen théorique.
        </p>
      </div>

      {/* Statut */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card mb-8 border-2 ${
          isEligible ? "border-success-500 bg-success-50/50" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-4">
          {isEligible ? (
            <CheckCircle className="w-10 h-10 text-success-500" />
          ) : (
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <h2 className="font-bold text-lg">
              {isEligible
                ? "Vous êtes éligible au certificat !"
                : "Critères en cours de validation..."}
            </h2>
            <p className="text-sm text-gray-600">
              {isEligible
                ? "Cliquez ci-dessous pour générer votre certificat."
                : "Continuez votre formation pour remplir tous les critères."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Critères */}
      <div className="space-y-4 mb-8">
        <h3 className="font-semibold text-lg">Critères à valider</h3>
        {Object.entries(criteria).map(([key, criterion], index) => {
          const Icon = criteriaIcons[key] || CheckCircle;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card flex items-center gap-4 ${
                criterion.met ? "bg-success-50/30" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  criterion.met ? "bg-success-50" : "bg-gray-100"
                }`}
              >
                {criterion.met ? (
                  <CheckCircle className="w-5 h-5 text-success-500" />
                ) : (
                  <Icon className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{criterion.label}</span>
                  <span
                    className={`text-sm font-bold ${
                      criterion.met ? "text-success-500" : "text-gray-500"
                    }`}
                  >
                    {criterion.current}
                    {key.includes("Score") || key.includes("Completed") || key.includes("Watched")
                      ? "%"
                      : ""}{" "}
                    / {criterion.required}
                    {key.includes("Score") || key.includes("Completed") || key.includes("Watched")
                      ? "%"
                      : ""}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      criterion.met ? "bg-success-500" : "bg-primary-400"
                    }`}
                    style={{
                      width: `${Math.min(
                        (criterion.current / criterion.required) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      {isEligible ? (
        <div className="space-y-4">
          <button className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2">
            <Award size={20} />
            Générer mon certificat
          </button>
          <button className="btn-secondary w-full py-3 flex items-center justify-center gap-2">
            <Download size={18} />
            Télécharger en PDF
          </button>
          <Link
            href="/auto-ecoles"
            className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-4"
          >
            Voir les auto-écoles partenaires →
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Continuez votre formation pour remplir tous les critères.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/cours" className="btn-primary">
              Continuer les cours
            </Link>
            <Link href="/examen-blanc" className="btn-secondary">
              Passer un examen blanc
            </Link>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold mb-3">À quoi sert le certificat ?</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            Il atteste que vous maîtrisez le code de la route
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            Il vous permet de vous inscrire à l&apos;examen via une auto-école partenaire
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            Il est vérifiable en ligne par les auto-écoles (numéro unique)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            Il est valide 1 an à compter de sa délivrance
          </li>
        </ul>
      </div>
    </div>
  );
}
