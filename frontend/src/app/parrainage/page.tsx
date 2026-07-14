"use client";

import { motion } from "framer-motion";
import { Gift, Users, Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";

export default function ParrainagePage() {
  const [copied, setCopied] = useState(false);

  // Code de parrainage simulé (en prod, généré par l'API)
  const referralCode = "JEAN-CR2026";
  const referralLink = `https://coderoute.cm/inscription?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Code Route Cameroun",
        text: "Inscris-toi sur Code Route CM et prépare ton examen du code ! Utilise mon lien pour un bonus.",
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Gift className="w-8 h-8 text-purple-500" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-3">
          Parrainez un ami, gagnez tous les deux !
        </h1>
        <p className="text-gray-600 text-lg">
          Invitez vos amis à rejoindre Code Route CM. Pour chaque ami inscrit,
          vous gagnez tous les deux 1 semaine gratuite.
        </p>
      </div>

      {/* Comment ça marche */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            step: "1",
            icon: Share2,
            title: "Partagez votre lien",
            desc: "Envoyez votre lien de parrainage à vos amis par WhatsApp, SMS ou les réseaux.",
          },
          {
            step: "2",
            icon: Users,
            title: "Votre ami s'inscrit",
            desc: "Il s'inscrit avec votre lien et paie son forfait de 30 000 FCFA.",
          },
          {
            step: "3",
            icon: Gift,
            title: "Vous gagnez tous les deux",
            desc: "Vous recevez 1 semaine gratuite chacun ajoutée à votre abonnement.",
          },
        ].map((item) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(item.step) * 0.1 }}
            className="card text-center"
          >
            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              {item.step}
            </div>
            <item.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mon lien de parrainage */}
      <div className="card max-w-lg mx-auto mb-8">
        <h3 className="font-semibold text-lg mb-4 text-center">
          Mon lien de parrainage
        </h3>

        {/* Code */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Mon code</p>
          <p className="text-2xl font-bold text-purple-600 font-mono">
            {referralCode}
          </p>
        </div>

        {/* Lien copiable */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              copied
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-primary-500 text-white hover:bg-primary-600"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copié !" : "Copier"}
          </button>
        </div>

        {/* Boutons de partage */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Salut ! Inscris-toi sur Code Route CM pour préparer ton permis. Utilise mon lien : ${referralLink}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Partager via WhatsApp
          </a>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 bg-primary-500 text-white rounded-lg font-medium text-sm hover:bg-primary-600 transition-colors"
          >
            <Share2 size={18} />
            Partager
          </button>
        </div>
      </div>

      {/* Stats de parrainage */}
      <div className="card max-w-lg mx-auto">
        <h3 className="font-semibold mb-4">Mes parrainages</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-xs text-gray-500">Amis invités</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-xs text-gray-500">Inscrits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">0 j</div>
            <div className="text-xs text-gray-500">Jours gagnés</div>
          </div>
        </div>
      </div>
    </div>
  );
}
