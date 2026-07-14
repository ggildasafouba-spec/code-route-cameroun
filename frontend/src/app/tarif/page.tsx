"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  BookOpen,
  Video,
  ClipboardCheck,
  Trophy,
  Award,
  Building,
  Smartphone,
} from "lucide-react";

const features = [
  { icon: BookOpen, text: "Accès illimité à tous les cours" },
  { icon: Video, text: "Toutes les vidéos pédagogiques" },
  { icon: ClipboardCheck, text: "QCM illimités avec corrections détaillées" },
  { icon: Trophy, text: "Examens blancs illimités" },
  { icon: Award, text: "Certificat de formation à la fin" },
  { icon: Building, text: "Mise en relation avec auto-école partenaire" },
  { icon: Smartphone, text: "Mode hors-ligne inclus" },
];

export default function TarifPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Un seul forfait, tout inclus</h1>
        <p className="text-gray-600 text-lg">
          Pas d&apos;abonnement mensuel. Pas de frais cachés.
          <br />
          Payez une fois, formez-vous pendant 6 mois.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-lg mx-auto border-2 border-primary-500 relative overflow-hidden"
      >
        {/* Badge */}
        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
          FORFAIT UNIQUE
        </div>

        <div className="text-center pt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Formation complète au Code
          </h2>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-5xl font-bold text-primary-600">30 000</span>
            <span className="text-xl text-gray-500">FCFA</span>
          </div>
          <p className="text-gray-500 mb-6">pour 6 mois d&apos;accès complet</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-primary-500" />
              </div>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/inscription"
          className="btn-primary w-full text-center block text-lg py-3"
        >
          S&apos;inscrire maintenant
        </Link>

        {/* Payment methods */}
        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-sm text-gray-500 mb-3">Paiement sécurisé par</p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-900">MTN</span>
              </div>
              <span className="text-sm font-medium">MoMo</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">OM</span>
              </div>
              <span className="text-sm font-medium">Orange Money</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Comment ça marche */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Inscrivez-vous",
              desc: "Payez 30 000 FCFA via Mobile Money",
            },
            {
              step: "2",
              title: "Formez-vous",
              desc: "Cours, vidéos, QCM et examens blancs pendant 6 mois",
            },
            {
              step: "3",
              title: "Obtenez le certificat",
              desc: "Validez les critères et recevez votre attestation",
            },
            {
              step: "4",
              title: "Passez l'examen",
              desc: "Inscrivez-vous via une auto-école partenaire",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ rapide */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="card">
            <h3 className="font-semibold mb-1">
              Que se passe-t-il après les 6 mois ?
            </h3>
            <p className="text-gray-600 text-sm">
              Si vous n&apos;avez pas terminé, vous pouvez renouveler à tarif réduit.
              Votre progression est conservée.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">
              C&apos;est quoi le certificat de formation ?
            </h3>
            <p className="text-gray-600 text-sm">
              C&apos;est une attestation prouvant que vous maîtrisez le code. Elle vous
              permet de vous inscrire directement à l&apos;examen théorique via nos
              auto-écoles partenaires.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">
              Comment ça marche avec les auto-écoles ?
            </h3>
            <p className="text-gray-600 text-sm">
              Après votre certificat, vous choisissez une auto-école partenaire dans
              votre ville. Elle vous inscrit directement à l&apos;examen théorique du
              code — vous n&apos;avez pas besoin de reprendre les cours chez eux.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-1">
              Puis-je payer en plusieurs fois ?
            </h3>
            <p className="text-gray-600 text-sm">
              Pour le moment, le paiement est en une seule fois. Nous travaillons
              sur une option de paiement en 2 fois.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
