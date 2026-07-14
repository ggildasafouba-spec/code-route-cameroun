"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Phone,
  Mail,
} from "lucide-react";

// Données simulées
const users = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Kamga",
    phone: "+237691234567",
    email: "jean@mail.com",
    role: "ELEVE",
    city: "Douala",
    isActive: true,
    subscription: { status: "ACTIVE", endDate: "2027-01-15" },
    createdAt: "2026-07-01",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Nguemo",
    phone: "+237677890123",
    email: null,
    role: "ELEVE",
    city: "Yaoundé",
    isActive: true,
    subscription: { status: "ACTIVE", endDate: "2026-12-20" },
    createdAt: "2026-06-20",
  },
  {
    id: "3",
    firstName: "Paul",
    lastName: "Nganou",
    phone: "+237655111222",
    email: "paul@autoecole.cm",
    role: "AUTO_ECOLE",
    city: "Douala",
    isActive: true,
    subscription: null,
    createdAt: "2026-05-15",
  },
  {
    id: "4",
    firstName: "Alain",
    lastName: "Tchoupo",
    phone: "+237699333444",
    email: "alain@mail.com",
    role: "ELEVE",
    city: "Bafoussam",
    isActive: false,
    subscription: { status: "EXPIRED", endDate: "2026-06-01" },
    createdAt: "2026-01-10",
  },
  {
    id: "5",
    firstName: "Sophie",
    lastName: "Mbarga",
    phone: "+237670555666",
    email: null,
    role: "ELEVE",
    city: "Yaoundé",
    isActive: true,
    subscription: { status: "ACTIVE", endDate: "2027-02-28" },
    createdAt: "2026-07-10",
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = users.filter((u) => {
    const matchesSearch =
      !search ||
      `${u.firstName} ${u.lastName} ${u.phone} ${u.email || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-gray-500 text-sm">{users.length} utilisateurs au total</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "ELEVE", "AUTO_ECOLE", "ADMIN"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                roleFilter === role
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {role === "ALL"
                ? "Tous"
                : role === "ELEVE"
                ? "Élèves"
                : role === "AUTO_ECOLE"
                ? "Auto-écoles"
                : "Admins"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Utilisateur
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Rôle
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Ville
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Abonnement
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Statut
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      Inscrit le{" "}
                      {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Phone size={12} />
                        {user.phone}
                      </span>
                      {user.email && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Mail size={12} />
                          {user.email}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-red-50 text-red-700"
                          : user.role === "AUTO_ECOLE"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {user.role === "ELEVE"
                        ? "Élève"
                        : user.role === "AUTO_ECOLE"
                        ? "Auto-école"
                        : "Admin"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.city}
                  </td>
                  <td className="px-4 py-3">
                    {user.subscription ? (
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.subscription.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.subscription.status === "ACTIVE"
                          ? "Actif"
                          : "Expiré"}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.isActive ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <UserCheck size={14} />
                        Actif
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 text-sm">
                        <UserX size={14} />
                        Désactivé
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded hover:bg-gray-100">
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
