"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ErreursPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="card">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Aucune erreur à revoir !</h1>
        <p className="text-gray-600 mb-6">
          Vous n&apos;avez pas encore fait d&apos;erreurs, ou toutes vos erreurs ont été corrigées.
          Continuez à réviser pour en accumuler et les retravailler ici.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/revision" className="btn-secondary flex items-center gap-2">
            <ArrowLeft size={18} /> Retour
          </Link>
          <Link href="/revision/aleatoire" className="btn-primary">
            Faire une série aléatoire
          </Link>
        </div>
      </div>
    </div>
  );
}
