"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const themes = [
  { slug: "signalisation", title: "Signalisation routière", questions: 80 },
  { slug: "priorites", title: "Règles de priorité", questions: 65 },
  { slug: "securite", title: "Sécurité & vitesse", questions: 70 },
  { slug: "conduite", title: "Conduite & dépassements", questions: 60 },
  { slug: "visibilite", title: "Visibilité & éclairage", questions: 45 },
  { slug: "usagers", title: "Partage de la route", questions: 50 },
  { slug: "mecanique", title: "Mécanique & équipements", questions: 40 },
  { slug: "environnement", title: "Éco-conduite", questions: 35 },
  { slug: "premiers-secours", title: "Premiers secours", questions: 30 },
  { slug: "administratif", title: "Infractions & administratif", questions: 35 },
];

export default function ThematiquePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/revision" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={16} /> Retour aux modes
      </Link>
      <h1 className="text-2xl font-bold mb-2">Séries thématiques</h1>
      <p className="text-gray-600 mb-6">Choisissez un thème pour réviser</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {themes.map((theme, i) => (
          <motion.div key={theme.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Link href={`/revision/thematique/${theme.slug}`} className="card block hover:shadow-md transition-shadow">
              <h3 className="font-semibold">{theme.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{theme.questions} questions</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
