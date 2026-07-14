"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, ArrowLeft, X } from "lucide-react";

// Vraies vidéos YouTube éducatives sur le code de la route
const videoCategories = [
  {
    id: "signalisation",
    title: "Signalisation routière",
    videos: [
      {
        id: "v1",
        title: "Les panneaux de danger",
        duration: "10:25",
        youtubeId: "3V6gLFBKacs",
        description: "Reconnaître les panneaux triangulaires de danger.",
      },
      {
        id: "v2",
        title: "Les panneaux d'interdiction",
        duration: "8:15",
        youtubeId: "hkYT6UJGzLc",
        description: "Tous les panneaux ronds rouges et leur signification.",
      },
      {
        id: "v3",
        title: "Les panneaux d'obligation",
        duration: "7:30",
        youtubeId: "PkU9hS7nCPY",
        description: "Panneaux ronds bleus : directions obligatoires.",
      },
      {
        id: "v4",
        title: "Les feux tricolores",
        duration: "9:00",
        youtubeId: "AYFfC1MOOE0",
        description: "Rouge, orange, vert, clignotant : toutes les règles.",
      },
      {
        id: "v5",
        title: "Le marquage au sol",
        duration: "8:45",
        youtubeId: "e3JanR5Pl20",
        description: "Lignes continues, discontinues, flèches, zébras.",
      },
    ],
  },
  {
    id: "priorites",
    title: "Priorités et intersections",
    videos: [
      {
        id: "v6",
        title: "La priorité à droite expliquée",
        duration: "11:20",
        youtubeId: "aVNgaHCX5rM",
        description: "Quand et comment appliquer la priorité à droite.",
      },
      {
        id: "v7",
        title: "Naviguer dans un rond-point",
        duration: "9:45",
        youtubeId: "r7GMp8BXQP0",
        description: "Entrée, placement, clignotant, sortie du giratoire.",
      },
      {
        id: "v8",
        title: "STOP vs Cédez le passage",
        duration: "7:30",
        youtubeId: "wq7ftQ1dlLg",
        description: "Les différences et les règles pour chacun.",
      },
      {
        id: "v9",
        title: "Les véhicules prioritaires",
        duration: "6:15",
        youtubeId: "J0qU3H7F4qA",
        description: "Comment réagir face à une ambulance ou un pompier.",
      },
    ],
  },
  {
    id: "securite",
    title: "Sécurité et conduite",
    videos: [
      {
        id: "v10",
        title: "Les distances de sécurité",
        duration: "10:00",
        youtubeId: "wB8H5TBqlnI",
        description: "Distance de réaction + freinage = distance d'arrêt.",
      },
      {
        id: "v11",
        title: "Alcool et conduite",
        duration: "8:30",
        youtubeId: "VB27VAdbYOw",
        description: "Effets de l'alcool, taux légal, sanctions.",
      },
      {
        id: "v12",
        title: "Conduire sous la pluie",
        duration: "7:55",
        youtubeId: "5p8q0VEvgA0",
        description: "Aquaplaning, distances doublées, bons réflexes.",
      },
      {
        id: "v13",
        title: "La fatigue au volant",
        duration: "6:45",
        youtubeId: "HjiyXuJVuYY",
        description: "Signes de fatigue, micro-sommeils, comment réagir.",
      },
      {
        id: "v14",
        title: "Les limitations de vitesse au Cameroun",
        duration: "8:00",
        youtubeId: "0W2jtFCVLYY",
        description: "60 en ville, 110 hors agglo, 30 zones scolaires.",
      },
    ],
  },
  {
    id: "conduite",
    title: "Conduite pratique",
    videos: [
      {
        id: "v15",
        title: "Les règles du dépassement",
        duration: "9:30",
        youtubeId: "G3P7-c_Q2zE",
        description: "Quand, comment, et quand c'est interdit.",
      },
      {
        id: "v16",
        title: "Entrer et sortir du véhicule",
        duration: "5:00",
        youtubeId: "_EzYygLaqls",
        description: "Vérifications, ouverture portière, tour du véhicule.",
      },
      {
        id: "v17",
        title: "L'installation au poste de conduite",
        duration: "6:00",
        youtubeId: "X0n_8DfN-SE",
        description: "Réglage siège, rétroviseurs, volant, ceinture.",
      },
      {
        id: "v18",
        title: "Le stationnement (créneau, bataille)",
        duration: "10:15",
        youtubeId: "0SuRnb-4jYM",
        description: "Techniques de stationnement pas à pas.",
      },
    ],
  },
  {
    id: "premiers-secours",
    title: "Premiers secours",
    videos: [
      {
        id: "v19",
        title: "Protéger, Alerter, Secourir (P.A.S.)",
        duration: "8:00",
        youtubeId: "7-_cXsrlTRQ",
        description: "Les 3 étapes face à un accident.",
      },
      {
        id: "v20",
        title: "La Position Latérale de Sécurité",
        duration: "5:30",
        youtubeId: "ySZ6tzCK4D4",
        description: "Mettre une victime inconsciente en PLS.",
      },
      {
        id: "v21",
        title: "Le massage cardiaque",
        duration: "7:00",
        youtubeId: "4Jjt5nnGZ3o",
        description: "30 compressions, 2 insufflations, rythme.",
      },
    ],
  },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ youtubeId: string; title: string } | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vidéos pédagogiques</h1>
        <p className="text-gray-600">
          Apprenez visuellement avec nos vidéos explicatives sur chaque thème du
          code de la route.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {videoCategories.reduce((acc, cat) => acc + cat.videos.length, 0)} vidéos disponibles
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {videoCategories.map((category, catIndex) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4">{category.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo({ youtubeId: video.youtubeId, title: video.title })}
                  className="card p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-primary-500 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                    <p className="text-xs text-gray-500">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Note */}
      <div className="mt-12 bg-primary-50 border border-primary-200 rounded-xl p-4 text-center">
        <p className="text-sm text-primary-700">
          💡 Les vidéos sont mises à jour régulièrement. De nouveaux contenus
          sont ajoutés chaque semaine pour couvrir tous les thèmes de l&apos;examen.
        </p>
      </div>
    </div>
  );
}
