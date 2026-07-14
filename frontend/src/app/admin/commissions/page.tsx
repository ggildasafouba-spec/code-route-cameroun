"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";

// Données simulées
const commissions = [
  {
    id: "1",
    user: { firstName: "Jean", lastName: "Kamga", phone: "+237691234567" },
    autoEcole: { name: "Auto-École Excellence", city: "Douala" },
    commissionAmount: 7500,
    status: "PENDING",
    createdAt: "2026-07-10",
  },
  {
    id: "2",
    user: { firstName: "Marie", lastName: "Nguemo", phone: "+237677890123" },
    autoEcole: { name: "Auto-École du Centre", city: "Yaoundé" },
    commissionAmount: 7500,
    status: "CONFIRMED",
    createdAt: "2026-07-05",
  },
  {
    id: "3",
    user: { firstName: "Pierre", lastName: "Douala", phone: "+237655444555" },
    autoEcole: { name: "Auto-École Excellence", city: "Douala" },
    commissionAmount: 7500,
    status: "PAID",
    createdAt: "2026-06-28",
    paidAt: "2026-07-02",
  },
  {
    id: "4",
    user: { firstName: "Alain", lastName: "Biya", phone: "+237670111222" },
    autoEcole: { name: "Auto-École Réussite", city: "Bafoussam" },
    commissionAmount: 7500,
    status: "PAID",
    createdAt: "2026-06-20",
    paidAt: "2026-06-25",
  },
  {
    id: "5",
    user: { firstName: "Sophie", lastName: "Mbarga", phone: "+237699333444" },
    autoEcole: { name: "Auto-École du Centre", city: "Yaoundé" },
    commissionAmount: 7500,
    status: "CONFIRMED",
    createdAt: "2026-07-12",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "En attente", color: "text-yellow-600 bg-yellow-50", icon: Clock },
  CONFIRMED: { label: "Confirmé", color: "text-blue-600 bg-blue-50", icon: AlertCircle },
  PAID: { label: "Payé", color: "text-green-600 bg-green-50", icon: CheckCircle },
};

export default function AdminCommissionsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? commissions
      : commissions.filter((c) => c.status === filter);

  const totalPending = commissions
    .filter((c) => c.status === "PENDING" || c.status === "CONFIRMED")
    .reduce((s, c) => s + c.commissionAmount, 0);

  const totalPaid = commissions
    .filter((c) => c.status === "PAID")
    .reduce((s, c) => s + c.commissionAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Gestion des commissions</h1>
        <p className="text-gray-500 text-sm">
          Suivez les élèves envoyés aux auto-écoles partenaires et les commissions associées.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {totalPending.toLocaleString()} F
              </div>
              <div className="text-xs text-gray-500">À encaisser</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {totalPaid.toLocaleString()} F
              </div>
              <div className="text-xs text-gray-500">Déjà encaissé</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-xl font-bold">{commissions.length}</div>
              <div className="text-xs text-gray-500">Total referrals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "ALL", label: "Tous" },
          { key: "PENDING", label: "En attente" },
          { key: "CONFIRMED", label: "Confirmés" },
          { key: "PAID", label: "Payés" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste des commissions */}
      <div className="space-y-3">
        {filtered.map((commission, index) => {
          const config = statusConfig[commission.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={commission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${config.color}`}
                  >
                    <StatusIcon size={18} />
                  </div>
                  <div>
                    <div className="font-medium">
                      {commission.user.firstName} {commission.user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {commission.user.phone} → {commission.autoEcole.name} (
                      {commission.autoEcole.city})
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(commission.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {commission.commissionAmount.toLocaleString()} F
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {commission.status === "PENDING" && (
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">
                        Confirmer
                      </button>
                    )}
                    {commission.status === "CONFIRMED" && (
                      <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100">
                        Marquer payé
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
