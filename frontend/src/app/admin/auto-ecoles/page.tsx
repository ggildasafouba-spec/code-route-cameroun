"use client";

import { motion } from "framer-motion";
import {
  Building,
  CheckCircle,
  XCircle,
  Star,
  Users,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";

// Données simulées
const autoEcoles = [
  {
    id: "1",
    name: "Auto-École Excellence",
    city: "Douala",
    address: "Rue de la Joie, Akwa",
    phone: "+237691234567",
    email: "excellence@autoecole.cm",
    isVerified: true,
    isPartner: true,
    commissionRate: 7500,
    examPrice: 25000,
    rating: 4.5,
    totalStudents: 45,
    owner: { firstName: "Paul", lastName: "Nganou" },
  },
  {
    id: "2",
    name: "Auto-École du Centre",
    city: "Yaoundé",
    address: "Carrefour Nlongkak",
    phone: "+237699456789",
    email: "centre@autoecole.cm",
    isVerified: true,
    isPartner: true,
    commissionRate: 7500,
    examPrice: 22000,
    rating: 4.7,
    totalStudents: 67,
    owner: { firstName: "Marie", lastName: "Fotso" },
  },
  {
    id: "3",
    name: "Conduite Plus",
    city: "Bamenda",
    address: "Commercial Avenue",
    phone: "+237677111222",
    email: "conduiteplus@mail.cm",
    isVerified: false,
    isPartner: false,
    commissionRate: 7500,
    examPrice: 20000,
    rating: 0,
    totalStudents: 0,
    owner: { firstName: "John", lastName: "Fon" },
  },
];

export default function AdminAutoEcolesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Auto-écoles partenaires</h1>
          <p className="text-gray-500 text-sm">
            Gérez les partenariats et les commissions par auto-école.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">
            {autoEcoles.filter((ae) => ae.isVerified).length}
          </div>
          <div className="text-sm text-gray-500">Vérifiées</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {autoEcoles.filter((ae) => ae.isPartner).length}
          </div>
          <div className="text-sm text-gray-500">Partenaires actifs</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {autoEcoles.filter((ae) => !ae.isVerified).length}
          </div>
          <div className="text-sm text-gray-500">En attente de validation</div>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {autoEcoles.map((ae, index) => (
          <motion.div
            key={ae.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    ae.isVerified ? "bg-green-50" : "bg-yellow-50"
                  }`}
                >
                  <Building
                    className={`w-6 h-6 ${
                      ae.isVerified ? "text-green-500" : "text-yellow-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{ae.name}</h3>
                    {ae.isVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {ae.city} — {ae.address}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Propriétaire : {ae.owner.firstName} {ae.owner.lastName}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Phone size={12} />
                      {ae.phone}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Mail size={12} />
                      {ae.email}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Star size={12} className="text-yellow-400" />
                      {ae.rating || "N/A"}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users size={12} />
                      {ae.totalStudents} élèves
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="text-sm">
                  <span className="text-gray-500">Commission :</span>
                  <span className="font-bold ml-1">
                    {ae.commissionRate.toLocaleString()} F/élève
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Prix examen :</span>
                  <span className="font-bold ml-1">
                    {ae.examPrice?.toLocaleString()} F
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  {!ae.isVerified && (
                    <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100">
                      Valider
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200">
                    Modifier commission
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
