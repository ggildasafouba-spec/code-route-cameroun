"use client";

import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Pas de connexion internet</h1>
        <p className="text-gray-600 mb-6">
          Vous êtes actuellement hors-ligne. Certaines fonctionnalités ne sont
          pas disponibles sans connexion.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Vos QCM téléchargés et vos cours en cache restent accessibles.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={18} />
          Réessayer
        </button>
      </div>
    </div>
  );
}
