"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CR</span>
              </div>
              <span className="font-bold text-lg text-white">
                Code Route <span className="text-primary-400">CM</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              La première plateforme camerounaise de formation au code de la
              route 100% en ligne.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+237 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>contact@coderoute.cm</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Douala, Cameroun</span>
              </div>
            </div>
          </div>

          {/* Formation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Formation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cours" className="hover:text-primary-400 transition-colors">
                  Cours en ligne
                </Link>
              </li>
              <li>
                <Link href="/revision" className="hover:text-primary-400 transition-colors">
                  Révision QCM
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-primary-400 transition-colors">
                  Vidéos pédagogiques
                </Link>
              </li>
              <li>
                <Link href="/examen-blanc" className="hover:text-primary-400 transition-colors">
                  Examens blancs
                </Link>
              </li>
              <li>
                <Link href="/certificat" className="hover:text-primary-400 transition-colors">
                  Certificat de formation
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tarif" className="hover:text-primary-400 transition-colors">
                  Tarif (30 000 FCFA)
                </Link>
              </li>
              <li>
                <Link href="/auto-ecoles" className="hover:text-primary-400 transition-colors">
                  Auto-écoles partenaires
                </Link>
              </li>
              <li>
                <Link href="/parrainage" className="hover:text-primary-400 transition-colors">
                  Parrainage
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-primary-400 transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-primary-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/237XXXXXXXXX?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20Code%20Route%20CM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors flex items-center gap-2"
                >
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@coderoute.cm" className="hover:text-primary-400 transition-colors">
                  Email support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Code Route Cameroun. Tous droits
            réservés.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Développé avec <Heart size={12} className="text-red-500 fill-red-500" /> par{" "}
            <span className="text-primary-400 font-medium">
              Germain AFOUBA
            </span>
            , Développeur Full-Stack
          </p>
        </div>
      </div>
    </footer>
  );
}
