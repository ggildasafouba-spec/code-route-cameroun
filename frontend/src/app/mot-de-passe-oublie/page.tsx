"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, CheckCircle } from "lucide-react";

export default function MotDePasseOubliePage() {
  const [step, setStep] = useState<"phone" | "code" | "reset" | "done">("phone");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full"
      >
        {step === "done" ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Mot de passe modifié !</h1>
            <p className="text-gray-600 mb-6">
              Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <Link href="/connexion" className="btn-primary w-full block text-center">
              Se connecter
            </Link>
          </div>
        ) : (
          <>
            <Link
              href="/connexion"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
            >
              <ArrowLeft size={16} />
              Retour à la connexion
            </Link>

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
              <p className="text-gray-500 mt-1 text-sm">
                {step === "phone" &&
                  "Entrez votre numéro de téléphone pour recevoir un code de vérification."}
                {step === "code" &&
                  "Entrez le code à 6 chiffres envoyé par SMS."}
                {step === "reset" &&
                  "Choisissez votre nouveau mot de passe."}
              </p>
            </div>

            {step === "phone" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("code");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg text-sm text-gray-600">
                      +237
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="6XX XXX XXX"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Envoyer le code
                </button>
              </form>
            )}

            {step === "code" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("reset");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code de vérification
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Code envoyé au +237 {phone}
                  </p>
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Vérifier
                </button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-sm text-primary-500 w-full text-center"
                >
                  Renvoyer le code
                </button>
              </form>
            )}

            {step === "reset" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("done");
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 8 caractères"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="Retapez le mot de passe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    required
                    minLength={8}
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Enregistrer
                </button>
              </form>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
