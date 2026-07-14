"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Star,
  Users,
  CheckCircle,
  Building,
} from "lucide-react";

// Données simulées (en production, chargées depuis l'API)
const autoEcoles = [
  {
    id: "1",
    name: "Auto-École Excellence",
    city: "Douala",
    address: "Rue de la Joie, Akwa",
    phone: "+237 691 234 567",
    rating: 4.5,
    totalStudents: 45,
    examPrice: 25000,
    description:
      "Auto-école réputée avec plus de 10 ans d'expérience. Taux de réussite élevé.",
  },
  {
    id: "2",
    name: "Auto-École Victoire",
    city: "Douala",
    address: "Boulevard de la Liberté, Bonapriso",
    phone: "+237 677 890 123",
    rating: 4.2,
    totalStudents: 32,
    examPrice: 20000,
    description:
      "Spécialisée dans la formation rapide. Plusieurs sessions d'examen par mois.",
  },
  {
    id: "3",
    name: "Auto-École du Centre",
    city: "Yaoundé",
    address: "Carrefour Nlongkak",
    phone: "+237 699 456 789",
    rating: 4.7,
    totalStudents: 67,
    examPrice: 22000,
    description:
      "La meilleure auto-école de Yaoundé. Accompagnement personnalisé.",
  },
  {
    id: "4",
    name: "Conduite Plus",
    city: "Yaoundé",
    address: "Avenue Kennedy, Bastos",
    phone: "+237 655 111 222",
    rating: 4.0,
    totalStudents: 28,
    examPrice: 20000,
    description:
      "Auto-école moderne avec piste privée pour la pratique.",
  },
  {
    id: "5",
    name: "Auto-École Réussite",
    city: "Bafoussam",
    address: "Quartier Administratif",
    phone: "+237 670 333 444",
    rating: 4.3,
    totalStudents: 19,
    examPrice: 18000,
    description:
      "Première auto-école partenaire de l'Ouest. Encadrement de qualité.",
  },
];

const cities = ["Toutes", "Douala", "Yaoundé", "Bafoussam", "Bamenda", "Garoua"];

export default function AutoEcolesPage() {
  const [selectedCity, setSelectedCity] = useState("Toutes");

  const filtered =
    selectedCity === "Toutes"
      ? autoEcoles
      : autoEcoles.filter((ae) => ae.city === selectedCity);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Auto-écoles partenaires</h1>
        <p className="text-gray-600">
          Après votre certificat de formation, inscrivez-vous à l&apos;examen
          théorique dans une auto-école partenaire près de chez vous.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-primary-800">Comment ça fonctionne ?</p>
          <p className="text-sm text-primary-700 mt-1">
            1. Terminez votre formation en ligne et obtenez le certificat →{" "}
            2. Choisissez une auto-école partenaire dans votre ville →{" "}
            3. Inscrivez-vous directement à l&apos;examen théorique (pas besoin de
            reprendre les cours chez eux).
          </p>
        </div>
      </div>

      {/* Filtre par ville */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCity === city
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((ae, index) => (
          <motion.div
            key={ae.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-7 h-7 text-primary-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg">{ae.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{ae.rating}</span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-1">{ae.description}</p>

                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {ae.city} — {ae.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} />
                    {ae.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {ae.totalStudents} élèves inscrits
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div>
                    <span className="text-xs text-gray-500">
                      Inscription examen
                    </span>
                    <div className="font-bold text-primary-600">
                      {ae.examPrice?.toLocaleString()} FCFA
                    </div>
                  </div>
                  <button className="btn-primary text-sm">
                    Choisir cette auto-école
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucune auto-école partenaire dans cette ville pour le moment.</p>
          <p className="text-sm mt-1">
            Nous ajoutons régulièrement de nouvelles auto-écoles.
          </p>
        </div>
      )}
    </div>
  );
}
