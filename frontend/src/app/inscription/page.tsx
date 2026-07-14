"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, GraduationCap, Building } from "lucide-react";

export default function InscriptionPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"eleve" | "auto-ecole">("eleve");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">CR</span>
          </div>
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-gray-500 mt-1">
            Commencez votre formation au code de la route
          </p>
        </div>

        {/* Sélection du rôle */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setRole("eleve")}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              role === "eleve"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-primary-300"
            }`}
          >
            <GraduationCap
              className={`w-6 h-6 mx-auto mb-2 ${
                role === "eleve" ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">Élève</span>
          </button>
          <button
            onClick={() => setRole("auto-ecole")}
            className={`p-4 rounded-lg border-2 text-center transition-all ${
              role === "auto-ecole"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-primary-300"
            }`}
          >
            <Building
              className={`w-6 h-6 mx-auto mb-2 ${
                role === "auto-ecole" ? "text-primary-500" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">Auto-école</span>
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                placeholder="Jean"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                placeholder="Dupont"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

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
                placeholder="6XX XXX XXX"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (optionnel)
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          {role === "auto-ecole" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l&apos;auto-école
              </label>
              <input
                type="text"
                placeholder="Auto-école Excellence"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
              <option value="">Sélectionnez votre ville</option>
              <option value="douala">Douala</option>
              <option value="yaounde">Yaoundé</option>
              <option value="bafoussam">Bafoussam</option>
              <option value="bamenda">Bamenda</option>
              <option value="garoua">Garoua</option>
              <option value="maroua">Maroua</option>
              <option value="bertoua">Bertoua</option>
              <option value="ngaoundere">Ngaoundéré</option>
              <option value="limbe">Limbe</option>
              <option value="kribi">Kribi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie de permis visée
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white">
              <option value="">Sélectionnez la catégorie</option>
              <option value="A">Catégorie A - Moto</option>
              <option value="B">Catégorie B - Véhicule léger</option>
              <option value="C">Catégorie C - Poids lourd</option>
              <option value="D">Catégorie D - Transport en commun</option>
              <option value="E">Catégorie E - Remorque</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 caractères"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 mt-1"
              id="terms"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              J&apos;accepte les{" "}
              <Link href="/conditions" className="text-primary-500 underline">
                conditions d&apos;utilisation
              </Link>{" "}
              et la{" "}
              <Link
                href="/confidentialite"
                className="text-primary-500 underline"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            Créer mon compte
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Déjà inscrit ?{" "}
          <Link
            href="/connexion"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
