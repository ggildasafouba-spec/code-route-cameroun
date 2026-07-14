"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Lock,
  SignalHigh,
  Car,
  Shield,
  Eye,
  Users,
} from "lucide-react";

const categories = [
  {
    id: "signalisation",
    title: "Signalisation routière",
    description: "Panneaux d'interdiction, d'obligation, de danger et d'indication",
    icon: SignalHigh,
    lessons: 12,
    duration: "2h30",
    progress: 0,
    isLocked: false,
  },
  {
    id: "priorites",
    title: "Règles de priorité",
    description: "Intersections, rond-points, priorité à droite",
    icon: ArrowRight,
    lessons: 8,
    duration: "1h45",
    progress: 0,
    isLocked: false,
  },
  {
    id: "securite",
    title: "Sécurité routière",
    description: "Distances de sécurité, freinage, conditions météo",
    icon: Shield,
    lessons: 10,
    duration: "2h00",
    progress: 0,
    isLocked: false,
  },
  {
    id: "visibilite",
    title: "Visibilité et éclairage",
    description: "Feux, éclairage, conduite de nuit, brouillard",
    icon: Eye,
    lessons: 6,
    duration: "1h15",
    progress: 0,
    isLocked: true,
  },
  {
    id: "croisements",
    title: "Croisements et dépassements",
    description: "Règles de dépassement, voies de circulation",
    icon: Car,
    lessons: 7,
    duration: "1h30",
    progress: 0,
    isLocked: true,
  },
  {
    id: "usagers",
    title: "Partage de la route",
    description: "Piétons, cyclistes, motos, poids lourds",
    icon: Users,
    lessons: 8,
    duration: "1h45",
    progress: 0,
    isLocked: true,
  },
  {
    id: "infractions",
    title: "Infractions et sanctions",
    description: "Contraventions, délits, retrait de points, amendes",
    icon: AlertTriangle,
    lessons: 5,
    duration: "1h00",
    progress: 0,
    isLocked: true,
  },
];

export default function CoursPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cours de code</h1>
        <p className="text-gray-600">
          Apprenez le code de la route étape par étape avec nos leçons
          structurées.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Votre progression</h3>
            <p className="text-gray-500 text-sm">0 / 7 catégories terminées</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-500">0%</div>
            <p className="text-gray-500 text-sm">Complété</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-500 h-3 rounded-full transition-all"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={category.isLocked ? "#" : `/cours/${category.id}`}
              className={`card block hover:shadow-md transition-all ${
                category.isLocked ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    category.isLocked
                      ? "bg-gray-100"
                      : "bg-primary-50"
                  }`}
                >
                  {category.isLocked ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : (
                    <category.icon className="w-6 h-6 text-primary-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{category.lessons} leçons</span>
                    <span>•</span>
                    <span>{category.duration}</span>
                  </div>
                  {!category.isLocked && (
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${category.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
