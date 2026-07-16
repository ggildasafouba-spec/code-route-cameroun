"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, X, Lock, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

// Vidéos libres de droits depuis Pexels (scènes de conduite réelles)
const videoCategories = [
  {
    id: "conduite",
    title: "🚗 Scènes de conduite",
    color: "from-blue-500 to-blue-600",
    videos: [
      {
        id: "v1",
        title: "Conduite en ville — observer l'environnement",
        duration: "0:45",
        pexelsId: "855564",
        thumbnail: "https://images.pexels.com/videos/855564/free-video-855564.jpg?auto=compress&w=400",
      },
      {
        id: "v2",
        title: "Circulation sur autoroute — distances de sécurité",
        duration: "0:30",
        pexelsId: "854671",
        thumbnail: "https://images.pexels.com/videos/854671/free-video-854671.jpg?auto=compress&w=400",
      },
      {
        id: "v3",
        title: "Conduite de nuit — adapter sa vitesse",
        duration: "0:40",
        pexelsId: "856973",
        thumbnail: "https://images.pexels.com/videos/856973/free-video-856973.jpg?auto=compress&w=400",
      },
    ],
  },
  {
    id: "signalisation",
    title: "🚦 Signalisation & feux",
    color: "from-green-500 to-green-600",
    videos: [
      {
        id: "v4",
        title: "Feux tricolores — quand s'arrêter",
        duration: "0:35",
        pexelsId: "856186",
        thumbnail: "https://images.pexels.com/videos/856186/free-video-856186.jpg?auto=compress&w=400",
      },
      {
        id: "v5",
        title: "Carrefour urbain — lire les panneaux",
        duration: "0:50",
        pexelsId: "855282",
        thumbnail: "https://images.pexels.com/videos/855282/free-video-855282.jpg?auto=compress&w=400",
      },
      {
        id: "v6",
        title: "Marquage au sol — lignes continues et discontinues",
        duration: "0:40",
        pexelsId: "857032",
        thumbnail: "https://images.pexels.com/videos/857032/free-video-857032.jpg?auto=compress&w=400",
      },
    ],
  },
  {
    id: "securite",
    title: "🛡️ Sécurité routière",
    color: "from-red-500 to-red-600",
    videos: [
      {
        id: "v7",
        title: "Pluie et route mouillée — réduire la vitesse",
        duration: "0:45",
        pexelsId: "857195",
        thumbnail: "https://images.pexels.com/videos/857195/free-video-857195.jpg?auto=compress&w=400",
      },
      {
        id: "v8",
        title: "Piétons et passage protégé",
        duration: "0:30",
        pexelsId: "855669",
        thumbnail: "https://images.pexels.com/videos/855669/free-video-855669.jpg?auto=compress&w=400",
      },
      {
        id: "v9",
        title: "Rond-point — qui a la priorité ?",
        duration: "0:50",
        pexelsId: "854745",
        thumbnail: "https://images.pexels.com/videos/854745/free-video-854745.jpg?auto=compress&w=400",
      },
    ],
  },
  {
    id: "pratique",
    title: "🎯 Situations pratiques",
    color: "from-purple-500 to-purple-600",
    videos: [
      {
        id: "v10",
        title: "Stationnement — créneau pas à pas",
        duration: "1:00",
        pexelsId: "856410",
        thumbnail: "https://images.pexels.com/videos/856410/free-video-856410.jpg?auto=compress&w=400",
      },
      {
        id: "v11",
        title: "Dépassement sécurisé sur route",
        duration: "0:40",
        pexelsId: "855156",
        thumbnail: "https://images.pexels.com/videos/855156/free-video-855156.jpg?auto=compress&w=400",
      },
      {
        id: "v12",
        title: "Insertion sur voie rapide",
        duration: "0:35",
        pexelsId: "856789",
        thumbnail: "https://images.pexels.com/videos/856789/free-video-856789.jpg?auto=compress&w=400",
      },
    ],
  },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<{ pexelsId: string; title: string } | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero vidéo */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-4 overflow-hidden">
        {/* Background animated gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Play size={14} className="text-green-400" />
              <span>Vidéos de mise en situation</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Apprenez en
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> vidéo</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Observez des situations réelles de conduite et apprenez les bons réflexes
              avant de passer votre examen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={`https://videos.pexels.com/video-files/${selectedVideo.pexelsId}/free-video-${selectedVideo.pexelsId}.mp4`}
                controls
                autoPlay
                className="w-full h-full"
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
            <div className="p-4 bg-gray-800 text-center">
              <p className="text-sm text-gray-400">
                💡 Observez bien la scène et identifiez les règles du code qui s&apos;appliquent.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Video categories */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {videoCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <span className="text-sm text-gray-500">{category.videos.length} vidéos</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedVideo({ pexelsId: video.pexelsId, title: video.title })}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&w=400`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="w-6 h-6 text-primary-600 ml-1" />
                          </motion.div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                          {video.duration}
                        </div>
                        <div className={`absolute top-2 left-2 bg-gradient-to-r ${category.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-md`}>
                          GRATUIT
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary-600 transition-colors">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span className="text-green-600 font-medium">Mise en situation</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Envie de tester vos connaissances ?
            </h2>
            <p className="text-blue-100 mb-8">
              Après les vidéos, passez aux QCM pour vérifier que vous avez bien compris !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/revision"
                className="bg-white text-primary-600 font-bold py-3.5 px-8 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Lancer un QCM <ArrowRight size={18} />
              </Link>
              <Link
                href="/examen-blanc"
                className="border-2 border-white/30 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-all"
              >
                Passer un examen blanc
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
