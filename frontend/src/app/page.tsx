"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Video,
  ClipboardCheck,
  Trophy,
  Smartphone,
  Wifi,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Cours structurés",
    description:
      "Leçons complètes sur la signalisation, les priorités, la sécurité routière et plus encore.",
  },
  {
    icon: Video,
    title: "Vidéos explicatives",
    description:
      "Vidéos pédagogiques pour comprendre les situations de conduite complexes.",
  },
  {
    icon: ClipboardCheck,
    title: "QCM interactifs",
    description:
      "Des centaines de questions avec correction instantanée et explications détaillées.",
  },
  {
    icon: Trophy,
    title: "Examens blancs",
    description:
      "Simulations chronométrées dans les conditions réelles de l'examen (40 questions, 30 min).",
  },
  {
    icon: Smartphone,
    title: "Mobile Money",
    description:
      "Payez facilement avec MTN MoMo ou Orange Money. Pas besoin de carte bancaire.",
  },
  {
    icon: Wifi,
    title: "Mode hors-ligne",
    description:
      "Téléchargez les cours et révisez même sans connexion internet.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Préparez votre code de la route
            <br />
            <span className="text-primary-200">100% en ligne</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
          >
            La première plateforme camerounaise de formation au code de la
            route. Cours, QCM, vidéos et examens blancs pour réussir du premier
            coup.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/paiement"
              className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors text-lg"
            >
              S&apos;inscrire — 30 000 FCFA
            </Link>
            <Link
              href="/tarif"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Voir le programme
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600">500+</div>
            <div className="text-gray-600 mt-1">Questions QCM</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">50+</div>
            <div className="text-gray-600 mt-1">Vidéos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">20+</div>
            <div className="text-gray-600 mt-1">Examens blancs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">95%</div>
            <div className="text-gray-600 mt-1">Taux de réussite</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tout ce qu&apos;il faut pour réussir
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:shadow-md transition-shadow"
              >
                <feature.icon className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20 px-4 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Un seul forfait, tout inclus</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Pas d&apos;abonnement mensuel. Payez une fois, formez-vous pendant 6 mois.
          </p>
          <div className="inline-block bg-primary-50 border-2 border-primary-200 rounded-2xl p-8">
            <div className="text-5xl font-bold text-primary-600 mb-2">
              30 000 <span className="text-2xl">FCFA</span>
            </div>
            <p className="text-gray-500 mb-6">6 mois d&apos;accès complet</p>
            <ul className="text-left space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">✅ Tous les cours et vidéos</li>
              <li className="flex items-center gap-2">✅ QCM et examens blancs illimités</li>
              <li className="flex items-center gap-2">✅ Certificat de formation</li>
              <li className="flex items-center gap-2">✅ Mise en relation auto-école partenaire</li>
              <li className="flex items-center gap-2">✅ Paiement MTN MoMo ou Orange Money</li>
            </ul>
            <Link href="/paiement" className="btn-primary text-lg px-8 py-3 block">
              S&apos;inscrire maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Inscrivez-vous", desc: "Payez 30 000 FCFA via Mobile Money" },
              { step: "2", title: "Formez-vous", desc: "Cours, vidéos, QCM et examens blancs" },
              { step: "3", title: "Certificat", desc: "Validez les critères, obtenez l'attestation" },
              { step: "4", title: "Examen", desc: "Inscrivez-vous via une auto-école partenaire" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
