"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  Video,
  ClipboardCheck,
  Trophy,
  Building,
  Award,
  CreditCard,
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/cours", label: "Cours", icon: BookOpen },
    { href: "/revision", label: "Révision", icon: ClipboardCheck },
    { href: "/videos", label: "Vidéos", icon: Video },
    { href: "/examen-blanc", label: "Examen blanc", icon: Trophy },
    { href: "/auto-ecoles", label: "Auto-écoles", icon: Building },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span className="font-bold text-lg text-gray-900">
              Code Route <span className="text-primary-500">CM</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tarif"
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors text-sm"
            >
              Tarif
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/connexion" className="btn-secondary text-sm">
              Connexion
            </Link>
            <Link href="/paiement" className="btn-primary text-sm">
              S&apos;inscrire — 30 000F
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 py-3 px-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <Link
              href="/certificat"
              className="flex items-center gap-3 py-3 px-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <Award size={20} />
              Mon certificat
            </Link>
            <Link
              href="/tarif"
              className="flex items-center gap-3 py-3 px-2 text-primary-500 font-semibold hover:bg-primary-50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <CreditCard size={20} />
              Tarif — 30 000 FCFA
            </Link>
            <div className="flex gap-3 mt-4 pt-4 border-t">
              <Link
                href="/connexion"
                className="btn-secondary text-sm flex-1 text-center"
              >
                Connexion
              </Link>
              <Link
                href="/paiement"
                className="btn-primary text-sm flex-1 text-center"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
