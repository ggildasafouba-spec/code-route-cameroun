"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Video,
  ClipboardCheck,
  Trophy,
  Smartphone,
  Shield,
  Award,
  Building,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Cours structurés",
    description: "10 thèmes complets : signalisation, priorités, sécurité, conduite...",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ClipboardCheck,
    title: "500+ QCM interactifs",
    description: "Questions réelles avec correction instantanée et explications détaillées.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Trophy,
    title: "Examens blancs illimités",
    description: "40 questions, 30 min chrono. Chaque examen est unique et différent.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Award,
    title: "Certificat de formation",
    description: "Attestation officielle après validation des critères. PDF téléchargeable.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Building,
    title: "Auto-écoles partenaires",
    description: "Inscription directe à l'examen via nos partenaires dans votre ville.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Smartphone,
    title: "100% mobile",
    description: "Révisez partout, même hors-ligne. Installable sur votre téléphone.",
    color: "from-indigo-500 to-indigo-600",
  },
];

const steps = [
  { step: "01", title: "Inscrivez-vous", desc: "Payez 30 000 FCFA via Mobile Money (MTN MoMo ou Orange Money)", icon: Smartphone },
  { step: "02", title: "Formez-vous", desc: "Cours, QCM et examens blancs pendant 6 mois à votre rythme", icon: BookOpen },
  { step: "03", title: "Obtenez le certificat", desc: "Validez les critères (3 examens réussis à 80%+)", icon: Award },
  { step: "04", title: "Passez l'examen", desc: "Inscrivez-vous via une auto-école partenaire", icon: Trophy },
];

const testimonials = [
  { name: "Jean K.", city: "Douala", text: "J'ai réussi mon code du premier coup grâce à cette plateforme !", rating: 5 },
  { name: "Marie N.", city: "Yaoundé", text: "Les QCM sont exactement comme l'examen réel. Très bien fait.", rating: 5 },
  { name: "Paul F.", city: "Bafoussam", text: "Pratique de réviser sur le téléphone dans le bus !", rating: 4 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-blue-500 text-white py-20 md:py-28 px-4">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                <Zap size={14} className="text-yellow-400" />
                <span>La 1ère plateforme camerounaise de code en ligne</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Réussissez votre
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
                  code de la route
                </span>
                du premier coup
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                500+ questions, examens blancs, cours complets. Formez-vous à votre rythme
                et obtenez votre certificat en 6 mois.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/inscription"
                  className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-lg text-center"
                >
                  S&apos;inscrire — 30 000 FCFA
                </Link>
                <Link
                  href="/tarif"
                  className="border-2 border-white/30 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  Voir le programme <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                {/* Phone mockup */}
                <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl mx-auto w-72">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="bg-primary-500 p-4 text-white text-center">
                      <p className="text-xs opacity-70">Examen blanc #3</p>
                      <p className="text-2xl font-bold">32/40</p>
                      <p className="text-xs">80% — Réussi !</p>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs text-gray-600">Signalisation — 95%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs text-gray-600">Priorités — 85%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs text-gray-600">Sécurité — 90%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-600">Conduite — 65%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 text-center">
                      <p className="text-xs font-bold text-green-700">🎉 Prêt pour l&apos;examen !</p>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -left-8 top-12 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Série réussie</p>
                    <p className="text-[10px] text-gray-500">18/20 bonnes réponses</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-4 bottom-20 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Certificat obtenu</p>
                    <p className="text-[10px] text-gray-500">CRCM-2026-00042</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-white py-8 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Questions QCM" },
              { value: "10", label: "Thèmes complets" },
              { value: "∞", label: "Examens blancs" },
              { value: "95%", label: "Taux de réussite" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tout ce qu&apos;il faut pour <span className="text-primary-500">réussir</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une formation complète, interactive et adaptée au code de la route camerounais.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça <span className="text-primary-500">marche</span> ?
            </h2>
            <p className="text-gray-600">4 étapes simples vers votre permis de conduire</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                  {item.step}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Un seul forfait, tout inclus</h2>
            <p className="text-gray-600 mb-10">Pas d&apos;abonnement mensuel. Payez une fois, formez-vous 6 mois.</p>

            <div className="bg-white rounded-3xl shadow-xl border-2 border-primary-200 p-8 md:p-10 max-w-md mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                POPULAIRE
              </div>
              <div className="text-5xl md:text-6xl font-bold text-primary-600 mb-2">
                30 000 <span className="text-2xl">FCFA</span>
              </div>
              <p className="text-gray-500 mb-8">6 mois d&apos;accès complet</p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Tous les cours (10 thèmes)",
                  "500+ questions QCM",
                  "Examens blancs illimités",
                  "Certificat de formation",
                  "Auto-école partenaire",
                  "Paiement MTN MoMo / Orange Money",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/paiement"
                className="block w-full bg-gradient-to-r from-primary-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-primary-600 hover:to-blue-700 transition-all hover:scale-[1.02] shadow-lg text-center"
              >
                S&apos;inscrire maintenant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ils ont <span className="text-primary-500">réussi</span> avec nous
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 border"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à décrocher votre permis ?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Rejoignez les centaines d&apos;élèves qui ont réussi leur code avec Code Route CM.
            </p>
            <Link
              href="/inscription"
              className="inline-block bg-white text-primary-600 font-bold py-4 px-10 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              Commencer ma formation →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
