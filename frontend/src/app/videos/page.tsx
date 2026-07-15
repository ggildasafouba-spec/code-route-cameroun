"use client";

import Link from "next/link";
import { Video, ArrowRight } from "lucide-react";

export default function VideosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Video className="w-8 h-8 text-primary-500" />
      </div>
      <h1 className="text-2xl font-bold mb-3">Vidéos bientôt disponibles</h1>
      <p className="text-gray-600 mb-8">
        Nos vidéos pédagogiques sont en cours de production. Elles seront
        disponibles très prochainement. En attendant, révisez avec nos QCM et
        examens blancs !
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/revision" className="btn-primary flex items-center gap-2">
          Réviser les QCM <ArrowRight size={18} />
        </Link>
        <Link href="/examen-blanc" className="btn-secondary">
          Examen blanc
        </Link>
      </div>
    </div>
  );
}
