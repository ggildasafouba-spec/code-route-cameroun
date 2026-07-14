"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Building,
  Award,
  TrendingUp,
  DollarSign,
  UserPlus,
  BookOpen,
} from "lucide-react";

// Données simulées (en production, chargées depuis l'API /admin/dashboard)
const stats = {
  users: { total: 234, eleves: 210, autoEcoles: 5, recentSignups: 18 },
  revenue: { total: 5400000, formatted: "5 400 000 FCFA" },
  commissions: {
    total: 450000,
    pending: 150000,
    totalReferrals: 60,
    paidReferrals: 40,
    formatted: "450 000 FCFA",
  },
  subscriptions: { active: 180, totalPayments: 210, completedPayments: 195 },
  content: { questions: 320, certificates: 45, examAttempts: 890 },
};

const monthlyRevenue = [
  { month: "Fév 2026", revenue: 600000, signups: 20 },
  { month: "Mar 2026", revenue: 750000, signups: 25 },
  { month: "Avr 2026", revenue: 900000, signups: 30 },
  { month: "Mai 2026", revenue: 1050000, signups: 35 },
  { month: "Juin 2026", revenue: 1200000, signups: 40 },
  { month: "Juil 2026", revenue: 900000, signups: 30 },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Vue d&apos;ensemble de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/users" className="btn-secondary text-sm">
            Gérer les utilisateurs
          </Link>
          <Link href="/admin/commissions" className="btn-primary text-sm">
            Commissions
          </Link>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats.revenue.formatted}</div>
              <div className="text-xs text-gray-500">Revenus totaux</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats.users.eleves}</div>
              <div className="text-xs text-gray-500">Élèves inscrits</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {stats.commissions.formatted}
              </div>
              <div className="text-xs text-gray-500">Commissions gagnées</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-xl font-bold">
                +{stats.users.recentSignups}
              </div>
              <div className="text-xs text-gray-500">Cette semaine</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Revenus mensuels */}
        <div className="md:col-span-2 card">
          <h3 className="font-semibold text-lg mb-4">Revenus mensuels</h3>
          <div className="space-y-3">
            {monthlyRevenue.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-20">{month.month}</span>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-6 relative">
                    <div
                      className="bg-primary-500 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{
                        width: `${(month.revenue / 1500000) * 100}%`,
                        minWidth: "60px",
                      }}
                    >
                      <span className="text-xs text-white font-medium">
                        {(month.revenue / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-20 text-right">
                  {month.signups} inscrits
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé rapide */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Abonnements</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Actifs</span>
                <span className="font-bold text-green-600">
                  {stats.subscriptions.active}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paiements réussis</span>
                <span className="font-bold">
                  {stats.subscriptions.completedPayments}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Taux conversion</span>
                <span className="font-bold">
                  {Math.round(
                    (stats.subscriptions.completedPayments /
                      stats.subscriptions.totalPayments) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Commissions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total referrals</span>
                <span className="font-bold">
                  {stats.commissions.totalReferrals}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payés</span>
                <span className="font-bold text-green-600">
                  {stats.commissions.paidReferrals}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">En attente</span>
                <span className="font-bold text-yellow-600">
                  {stats.commissions.pending.toLocaleString()} F
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Contenu</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Questions QCM</span>
                <span className="font-bold">{stats.content.questions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Certificats délivrés</span>
                <span className="font-bold">{stats.content.certificates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Examens passés</span>
                <span className="font-bold">{stats.content.examAttempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation admin */}
      <div className="grid md:grid-cols-4 gap-4">
        <Link
          href="/admin/users"
          className="card hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="font-semibold">Utilisateurs</h3>
            <p className="text-xs text-gray-500">Gérer les comptes</p>
          </div>
        </Link>
        <Link
          href="/admin/commissions"
          className="card hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <CreditCard className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="font-semibold">Commissions</h3>
            <p className="text-xs text-gray-500">Referrals & paiements</p>
          </div>
        </Link>
        <Link
          href="/admin/auto-ecoles"
          className="card hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <Building className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="font-semibold">Auto-écoles</h3>
            <p className="text-xs text-gray-500">Partenaires</p>
          </div>
        </Link>
        <Link
          href="/admin/content"
          className="card hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <BookOpen className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="font-semibold">Contenu</h3>
            <p className="text-xs text-gray-500">Cours, QCM, vidéos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
