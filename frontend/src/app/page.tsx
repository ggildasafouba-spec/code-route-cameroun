"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
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
  Play,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO — Image de fond avec conducteur */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image — conducteur africain au volant */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80"
            alt="Conduite automobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-full text-sm text-green-300 mb-6"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Formation 100% en ligne — Accessible partout au Cameroun
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              Obtenez votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
                permis de conduire
              </span>
              depuis chez vous
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-300 mb-10 leading-relaxed"
            >
              Préparez l&apos;examen théorique du code de la route avec nos 500+ QCM, 
              nos examens blancs et notre suivi personnalisé. Payez avec MTN MoMo ou Orange Money.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/paiement"
                className="group bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-[1.02] shadow-xl shadow-primary-500/25 text-center text-lg flex items-center justify-center gap-3"
              >
                Commencer ma formation
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/revision"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all text-center text-lg"
              >
                Essayer les QCM
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-400" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                <span>+200 élèves inscrits</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                <span>4.8/5 satisfaction</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Ce que vous apprenez (avec images) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Une formation complète pour
              <span className="text-primary-500"> réussir du premier coup</span>
            </motion.h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Apprenez les panneaux, les priorités, la sécurité et la conduite 
              avec des méthodes interactives et efficaces.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80"
                alt="Apprentissage du code de la route"
                className="rounded-3xl shadow-2xl w-full"
              />
              {/* Overlay stats card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">95%</p>
                    <p className="text-xs text-gray-500">Taux de réussite</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Features list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: ClipboardCheck, color: "bg-blue-100 text-blue-600", title: "500+ questions QCM", desc: "Révisez avec des questions réalistes, corrigées et expliquées une par une." },
                { icon: Trophy, color: "bg-purple-100 text-purple-600", title: "Examens blancs illimités", desc: "40 questions en 30 minutes chrono. Chaque examen est différent du précédent." },
                { icon: BookOpen, color: "bg-green-100 text-green-600", title: "10 thèmes de cours", desc: "Signalisation, priorités, sécurité, conduite... tout le programme officiel." },
                { icon: Smartphone, color: "bg-orange-100 text-orange-600", title: "Accessible sur mobile", desc: "Révisez dans le bus, à la maison ou en pause. L'app fonctionne partout." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Comment ça marche */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              4 étapes pour obtenir votre
              <span className="text-primary-500"> certificat</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Inscrivez-vous", desc: "Payez 30 000 FCFA via Mobile Money", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80" },
              { step: "2", title: "Étudiez", desc: "Cours, QCM, examens blancs pendant 6 mois", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" },
              { step: "3", title: "Validez", desc: "Réussissez 3 examens blancs à 80%+", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80" },
              { step: "4", title: "Passez l'examen", desc: "Inscription en auto-école partenaire", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0571?auto=format&fit=crop&w=400&q=80" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-bold text-lg mt-4 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Tarif + image */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Pricing card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Un forfait unique,<br />
                <span className="text-primary-500">tout compris</span>
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 border-2 border-primary-100">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-primary-600">30 000</span>
                  <span className="text-xl text-gray-500">FCFA / 6 mois</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Accès à tous les cours (10 thèmes)",
                    "500+ questions QCM avec corrections",
                    "Examens blancs illimités",
                    "Certificat de formation officiel",
                    "Mise en relation auto-école",
                    "Paiement MTN MoMo ou Orange Money",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/paiement"
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl text-center transition-all hover:scale-[1.02] shadow-lg text-lg"
                >
                  S&apos;inscrire maintenant
                </Link>
              </div>
            </motion.div>

            {/* Right — Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Étudiants qui apprennent"
                className="rounded-3xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Témoignages */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ils ont réussi avec <span className="text-primary-500">Code Route CM</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Jean Kamga", city: "Douala", text: "J'ai obtenu mon code du premier coup ! Les examens blancs sont identiques à l'examen réel.", avatar: "JK" },
              { name: "Marie Nguemo", city: "Yaoundé", text: "Super pratique de réviser sur mon téléphone. L'app est claire et bien faite.", avatar: "MN" },
              { name: "Paul Fotso", city: "Bafoussam", text: "Le certificat m'a permis de m'inscrire directement à l'examen en auto-école.", avatar: "PF" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-5 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-700">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}, Cameroun</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA Final */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80"
            alt="Route africaine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/85" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Prêt à décrocher votre permis ?
            </h2>
            <p className="text-xl text-blue-200 mb-10">
              Rejoignez les centaines d&apos;élèves qui ont réussi avec Code Route CM.
              Commencez dès aujourd&apos;hui.
            </p>
            <Link
              href="/paiement"
              className="inline-block bg-white text-primary-700 font-bold py-4 px-10 rounded-2xl hover:bg-gray-100 transition-all hover:scale-[1.02] shadow-2xl text-lg"
            >
              S&apos;inscrire — 30 000 FCFA →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
