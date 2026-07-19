"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, Upload, CheckCircle, Phone, MapPin, FileText } from "lucide-react";
import Link from "next/link";

export default function DevenirPartenairePage() {
  const [submitted, setSubmitted] = useState(false);
  const [photoName, setPhotoName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Demande envoyée !</h1>
          <p className="text-gray-600 mb-6">
            Merci pour votre demande de partenariat. Notre équipe va vérifier
            vos informations et vous recontacter sous 48h.
          </p>
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-7 h-7 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Devenir auto-école partenaire</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Recevez des élèves déjà formés au code de la route, prêts à passer
            l&apos;examen théorique. Gagnez une commission sur chaque inscription.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Avantages */}
        <div className="lg:col-span-2">
          <div className="bg-primary-50 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Avantages du partenariat</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Élèves déjà formés au code — pas besoin de leur donner des cours</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Visibilité sur la plateforme (vue par tous les élèves de votre ville)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Inscription gratuite — aucun frais pour devenir partenaire</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Dashboard pour suivre vos élèves et vos inscriptions</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-primary-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Commission :</span> 7 500 FCFA
                par élève qui s&apos;inscrit à l&apos;examen chez vous.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-6">Formulaire de demande</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom auto-école */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l&apos;auto-école *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Auto-École Excellence"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>

              {/* Numéro d'agrément */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <FileText size={14} />
                    Numéro d&apos;agrément ministériel *
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: AGR-2024-00123"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Délivré par le Ministère des Transports du Cameroun
                </p>
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    Ville *
                  </span>
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
                  required
                >
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
                  <option value="ebolowa">Ebolowa</option>
                  <option value="buea">Buea</option>
                </select>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse complète *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Rue de la Joie, Akwa, Douala"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center gap-2">
                    <Phone size={14} />
                    Téléphone *
                  </span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg text-sm text-gray-600">
                    +237
                  </span>
                  <input
                    type="tel"
                    placeholder="6XX XXX XXX"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  placeholder="contact@votre-autoecole.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {/* Nom du gérant */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du gérant *
                </label>
                <input
                  type="text"
                  placeholder="Prénom et Nom"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
              </div>

              {/* Photo façade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo de la façade de l&apos;auto-école *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-facade"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPhotoName(e.target.files[0].name);
                      }
                    }}
                    required
                  />
                  <label htmlFor="photo-facade" className="cursor-pointer">
                    {photoName ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="text-sm font-medium">{photoName}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          Cliquez pour ajouter une photo
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          JPG, PNG — Max 5 Mo
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Prix examen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarif inscription examen théorique (FCFA) *
                </label>
                <input
                  type="number"
                  placeholder="Ex: 25000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Le prix que paie l&apos;élève pour s&apos;inscrire à l&apos;examen chez vous
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-lg mt-4"
              >
                Envoyer ma demande
              </button>

              <p className="text-xs text-gray-500 text-center">
                Nous vérifierons votre numéro d&apos;agrément et vous recontacterons sous 48h.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
