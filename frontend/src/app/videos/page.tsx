"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VideosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-3">Vidéos bientôt disponibles</h1>
      <p className="text-gray-600 mb-8">
        Nos vidéos pédagogiques sont en cours de production.
        En attendant, révisez avec nos QCM et examens blancs.
      </p>
      <Link href="/revision" className="btn-primary inline-flex items-center gap-2">
        Réviser les QCM <ArrowRight size={18} />
      </Link>
    </div>
  );
}
