"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Shield, Clock, CheckCircle } from "lucide-react";

export default function PaiementPage() {
  const [method, setMethod] = useState<"MTN_MOMO" | "ORANGE_MONEY">("MTN_MOMO");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "pending" | "success">("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler l'appel API
    setTimeout(() => {
      setLoading(false);
      setStep("pending");
    }, 2000);
  };

  if (step === "success") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card"
        >
          <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Paiement confirmé !</h2>
          <p className="text-gray-600 mb-4">
            Votre accès est activé pour 6 mois. Bonne formation !
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Date d&apos;expiration : 14 janvier 2027
          </p>
          <a href="/dashboard" className="btn-primary w-full block text-center">
            Accéder à ma formation
          </a>
        </motion.div>
      </div>
    );
  }

  if (step === "pending") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Confirmez sur votre téléphone</h2>
          <p className="text-gray-600 mb-6">
            Un message de confirmation a été envoyé sur votre téléphone.
            <br />
            Composez votre code PIN {method === "MTN_MOMO" ? "MoMo" : "Orange Money"} pour valider.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Montant</span>
              <span className="font-bold">30 000 FCFA</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Numéro</span>
              <span className="font-medium">+237 {phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">
                {method === "MTN_MOMO" ? "MTN MoMo" : "Orange Money"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center text-sm text-gray-500 mb-6">
            <Clock size={14} />
            <span>En attente de confirmation...</span>
          </div>

          <button
            onClick={() => setStep("success")}
            className="btn-primary w-full"
          >
            J&apos;ai confirmé le paiement
          </button>
          <button
            onClick={() => setStep("form")}
            className="text-sm text-gray-500 mt-4 hover:text-gray-700"
          >
            Annuler et revenir
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Finaliser l&apos;inscription</h1>
          <p className="text-gray-500 mt-1">
            Formation complète au code — 6 mois
          </p>
        </div>

        {/* Récapitulatif */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Forfait 6 mois</p>
              <p className="text-sm text-gray-600">
                Accès illimité à tous les contenus
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">30 000</p>
              <p className="text-xs text-gray-500">FCFA</p>
            </div>
          </div>
        </div>

        {/* Choix méthode de paiement */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mode de paiement
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod("MTN_MOMO")}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                method === "MTN_MOMO"
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-300"
              }`}
            >
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xs font-bold text-yellow-900">MTN</span>
              </div>
              <span className="text-sm font-medium">MTN MoMo</span>
            </button>
            <button
              onClick={() => setMethod("ORANGE_MONEY")}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                method === "ORANGE_MONEY"
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xs font-bold text-white">OM</span>
              </div>
              <span className="text-sm font-medium">Orange Money</span>
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro {method === "MTN_MOMO" ? "MTN" : "Orange"}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg text-sm text-gray-600">
                +237
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={
                  method === "MTN_MOMO" ? "6XX XXX XXX" : "6XX XXX XXX"
                }
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Le numéro associé à votre compte{" "}
              {method === "MTN_MOMO" ? "MoMo" : "Orange Money"}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !phone}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Traitement en cours...</span>
            ) : (
              <>
                <Shield size={18} />
                Payer 30 000 FCFA
              </>
            )}
          </button>
        </form>

        {/* Sécurité */}
        <div className="mt-6 pt-4 border-t flex items-center gap-2 text-xs text-gray-500">
          <Shield size={14} />
          <span>
            Paiement sécurisé par NotchPay. Vos données sont protégées.
          </span>
        </div>
      </motion.div>
    </div>
  );
}
