"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, PlayCircle } from "lucide-react";

// Données simulées des leçons par catégorie
const lessonsData: Record<string, { title: string; lessons: { id: string; title: string; duration: string; isCompleted: boolean }[] }> = {
  signalisation: {
    title: "Signalisation routière",
    lessons: [
      { id: "1", title: "Les panneaux de danger (triangulaires)", duration: "8 min", isCompleted: false },
      { id: "2", title: "Les panneaux d'interdiction (ronds rouges)", duration: "7 min", isCompleted: false },
      { id: "3", title: "Les panneaux d'obligation (ronds bleus)", duration: "6 min", isCompleted: false },
      { id: "4", title: "Les panneaux d'indication", duration: "5 min", isCompleted: false },
      { id: "5", title: "Les feux tricolores", duration: "7 min", isCompleted: false },
      { id: "6", title: "Le marquage au sol", duration: "9 min", isCompleted: false },
      { id: "7", title: "Les panneaux de direction", duration: "6 min", isCompleted: false },
      { id: "8", title: "La signalisation temporaire (travaux)", duration: "5 min", isCompleted: false },
    ],
  },
  priorites: {
    title: "Règles de priorité",
    lessons: [
      { id: "1", title: "La priorité à droite", duration: "8 min", isCompleted: false },
      { id: "2", title: "Le panneau STOP", duration: "5 min", isCompleted: false },
      { id: "3", title: "Le panneau Cédez le passage", duration: "5 min", isCompleted: false },
      { id: "4", title: "Les rond-points (giratoires)", duration: "10 min", isCompleted: false },
      { id: "5", title: "Les véhicules prioritaires", duration: "6 min", isCompleted: false },
      { id: "6", title: "Les intersections complexes", duration: "8 min", isCompleted: false },
      { id: "7", title: "Priorité des piétons", duration: "6 min", isCompleted: false },
    ],
  },
  securite: {
    title: "Sécurité routière",
    lessons: [
      { id: "1", title: "Les distances de sécurité et de freinage", duration: "9 min", isCompleted: false },
      { id: "2", title: "Les limitations de vitesse au Cameroun", duration: "7 min", isCompleted: false },
      { id: "3", title: "L'alcool et la conduite", duration: "8 min", isCompleted: false },
      { id: "4", title: "La fatigue au volant", duration: "6 min", isCompleted: false },
      { id: "5", title: "La ceinture de sécurité", duration: "5 min", isCompleted: false },
      { id: "6", title: "Le téléphone au volant", duration: "5 min", isCompleted: false },
      { id: "7", title: "Conduite sous la pluie", duration: "7 min", isCompleted: false },
      { id: "8", title: "L'aquaplaning", duration: "6 min", isCompleted: false },
    ],
  },
  visibilite: {
    title: "Visibilité et éclairage",
    lessons: [
      { id: "1", title: "Les feux du véhicule", duration: "8 min", isCompleted: false },
      { id: "2", title: "Conduire de nuit", duration: "7 min", isCompleted: false },
      { id: "3", title: "Le brouillard", duration: "6 min", isCompleted: false },
      { id: "4", title: "Les angles morts", duration: "6 min", isCompleted: false },
      { id: "5", title: "Les rétroviseurs", duration: "5 min", isCompleted: false },
    ],
  },
  croisements: {
    title: "Croisements et dépassements",
    lessons: [
      { id: "1", title: "Les règles du dépassement", duration: "9 min", isCompleted: false },
      { id: "2", title: "Quand le dépassement est interdit", duration: "7 min", isCompleted: false },
      { id: "3", title: "Le dépassement par la droite", duration: "5 min", isCompleted: false },
      { id: "4", title: "Se rabattre après un dépassement", duration: "5 min", isCompleted: false },
      { id: "5", title: "Croiser dans une rue étroite", duration: "6 min", isCompleted: false },
    ],
  },
  usagers: {
    title: "Partage de la route",
    lessons: [
      { id: "1", title: "Les piétons", duration: "7 min", isCompleted: false },
      { id: "2", title: "Les cyclistes", duration: "6 min", isCompleted: false },
      { id: "3", title: "Les motos et motos-taxis", duration: "7 min", isCompleted: false },
      { id: "4", title: "Les poids lourds", duration: "6 min", isCompleted: false },
      { id: "5", title: "Les animaux sur la route", duration: "5 min", isCompleted: false },
    ],
  },
  infractions: {
    title: "Infractions et sanctions",
    lessons: [
      { id: "1", title: "Les documents obligatoires", duration: "6 min", isCompleted: false },
      { id: "2", title: "Les contraventions", duration: "7 min", isCompleted: false },
      { id: "3", title: "Les délits routiers", duration: "8 min", isCompleted: false },
      { id: "4", title: "L'assurance automobile", duration: "6 min", isCompleted: false },
      { id: "5", title: "Le contrôle technique", duration: "5 min", isCompleted: false },
    ],
  },
};

export default function CoursDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = lessonsData[slug];

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
        <p className="text-gray-600 mb-6">
          Cette catégorie de cours n&apos;existe pas encore.
        </p>
        <Link href="/cours" className="btn-primary">
          Retour aux cours
        </Link>
      </div>
    );
  }

  const completedCount = category.lessons.filter((l) => l.isCompleted).length;
  const progress = Math.round((completedCount / category.lessons.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <Link
        href="/cours"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft size={16} />
        Retour aux cours
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{category.lessons.length} leçons</span>
          <span>•</span>
          <span>{completedCount}/{category.lessons.length} terminées</span>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Liste des leçons */}
      <div className="space-y-3">
        {category.lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                lesson.isCompleted
                  ? "bg-green-50"
                  : "bg-primary-50"
              }`}
            >
              {lesson.isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <PlayCircle className="w-5 h-5 text-primary-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">
                {index + 1}. {lesson.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>{lesson.duration}</span>
              </div>
            </div>
            {lesson.isCompleted && (
              <span className="badge-success text-xs">Terminé</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href={`/revision/thematique/${slug}`}
          className="btn-primary inline-block"
        >
          Tester mes connaissances sur ce thème
        </Link>
      </div>
    </div>
  );
}
