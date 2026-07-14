/**
 * VIDÉOS PÉDAGOGIQUES PAR THÈME
 * Structure identique à Stych : chaque thème a des vidéos courtes (3-10 min)
 * 
 * Les URLs YouTube sont des vidéos éducatives existantes en français
 * sur le code de la route. À remplacer par vos propres vidéos en production.
 */

export interface VideoData {
  title: string;
  slug: string;
  description: string;
  videoUrl: string; // URL YouTube embed
  thumbnail: string;
  duration: number; // en secondes
  categorySlug: string;
  order: number;
}

export const videosData: VideoData[] = [
  // ============================================
  // SIGNALISATION ROUTIÈRE (6 vidéos)
  // ============================================
  {
    title: "Les panneaux de danger",
    slug: "panneaux-danger",
    description: "Apprenez à reconnaître tous les panneaux triangulaires de danger et leur signification.",
    videoUrl: "https://www.youtube.com/embed/placeholder-danger",
    thumbnail: "/videos/thumbnails/panneaux-danger.jpg",
    duration: 480, // 8 min
    categorySlug: "signalisation",
    order: 1,
  },
  {
    title: "Les panneaux d'interdiction",
    slug: "panneaux-interdiction",
    description: "Tous les panneaux ronds à fond blanc bordé de rouge : sens interdit, limitation de vitesse, etc.",
    videoUrl: "https://www.youtube.com/embed/placeholder-interdiction",
    thumbnail: "/videos/thumbnails/panneaux-interdiction.jpg",
    duration: 420, // 7 min
    categorySlug: "signalisation",
    order: 2,
  },
  {
    title: "Les panneaux d'obligation",
    slug: "panneaux-obligation",
    description: "Les panneaux ronds bleus : direction obligatoire, vitesse minimale, etc.",
    videoUrl: "https://www.youtube.com/embed/placeholder-obligation",
    thumbnail: "/videos/thumbnails/panneaux-obligation.jpg",
    duration: 360, // 6 min
    categorySlug: "signalisation",
    order: 3,
  },
  {
    title: "Les feux tricolores et leur fonctionnement",
    slug: "feux-tricolores",
    description: "Rouge, orange, vert, clignotant : que faire dans chaque situation.",
    videoUrl: "https://www.youtube.com/embed/placeholder-feux",
    thumbnail: "/videos/thumbnails/feux-tricolores.jpg",
    duration: 420,
    categorySlug: "signalisation",
    order: 4,
  },
  {
    title: "Le marquage au sol",
    slug: "marquage-sol",
    description: "Lignes continues, discontinues, de rive, de dissuasion, flèches directionnelles.",
    videoUrl: "https://www.youtube.com/embed/placeholder-marquage",
    thumbnail: "/videos/thumbnails/marquage-sol.jpg",
    duration: 540, // 9 min
    categorySlug: "signalisation",
    order: 5,
  },
  {
    title: "Les panneaux d'indication et de direction",
    slug: "panneaux-indication",
    description: "Panneaux bleus, verts, blancs : informations utiles et directions.",
    videoUrl: "https://www.youtube.com/embed/placeholder-indication",
    thumbnail: "/videos/thumbnails/panneaux-indication.jpg",
    duration: 390,
    categorySlug: "signalisation",
    order: 6,
  },

  // ============================================
  // RÈGLES DE PRIORITÉ (5 vidéos)
  // ============================================
  {
    title: "La priorité à droite expliquée",
    slug: "priorite-droite",
    description: "Quand s'applique la priorité à droite et les exceptions.",
    videoUrl: "https://www.youtube.com/embed/placeholder-priorite-droite",
    thumbnail: "/videos/thumbnails/priorite-droite.jpg",
    duration: 540,
    categorySlug: "priorites",
    order: 1,
  },
  {
    title: "Naviguer dans un rond-point",
    slug: "rond-point",
    description: "Entrée, circulation et sortie d'un giratoire. Placement et clignotants.",
    videoUrl: "https://www.youtube.com/embed/placeholder-rond-point",
    thumbnail: "/videos/thumbnails/rond-point.jpg",
    duration: 600, // 10 min
    categorySlug: "priorites",
    order: 2,
  },
  {
    title: "STOP et Cédez le passage",
    slug: "stop-cedez",
    description: "Différences entre STOP et Cédez le passage. Quand et comment s'arrêter.",
    videoUrl: "https://www.youtube.com/embed/placeholder-stop",
    thumbnail: "/videos/thumbnails/stop-cedez.jpg",
    duration: 420,
    categorySlug: "priorites",
    order: 3,
  },
  {
    title: "Les véhicules prioritaires",
    slug: "vehicules-prioritaires",
    description: "Ambulance, pompier, police : comment réagir quand ils arrivent.",
    videoUrl: "https://www.youtube.com/embed/placeholder-vehicules-prio",
    thumbnail: "/videos/thumbnails/vehicules-prioritaires.jpg",
    duration: 360,
    categorySlug: "priorites",
    order: 4,
  },
  {
    title: "Les intersections complexes",
    slug: "intersections-complexes",
    description: "Carrefours à plusieurs voies, tourne-à-gauche, priorités multiples.",
    videoUrl: "https://www.youtube.com/embed/placeholder-intersections",
    thumbnail: "/videos/thumbnails/intersections.jpg",
    duration: 600,
    categorySlug: "priorites",
    order: 5,
  },

  // ============================================
  // SÉCURITÉ & VITESSE (5 vidéos)
  // ============================================
  {
    title: "Les distances de sécurité et de freinage",
    slug: "distances-securite",
    description: "Comment calculer la distance d'arrêt. L'impact de la vitesse et de la pluie.",
    videoUrl: "https://www.youtube.com/embed/placeholder-distances",
    thumbnail: "/videos/thumbnails/distances-securite.jpg",
    duration: 540,
    categorySlug: "securite",
    order: 1,
  },
  {
    title: "L'alcool et la conduite",
    slug: "alcool-conduite",
    description: "Effets de l'alcool, taux légal au Cameroun (0.8g/l), sanctions.",
    videoUrl: "https://www.youtube.com/embed/placeholder-alcool",
    thumbnail: "/videos/thumbnails/alcool-conduite.jpg",
    duration: 480,
    categorySlug: "securite",
    order: 2,
  },
  {
    title: "La fatigue au volant",
    slug: "fatigue-volant",
    description: "Signes de fatigue, micro-sommeils, comment s'en protéger.",
    videoUrl: "https://www.youtube.com/embed/placeholder-fatigue",
    thumbnail: "/videos/thumbnails/fatigue-volant.jpg",
    duration: 420,
    categorySlug: "securite",
    order: 3,
  },
  {
    title: "Les limitations de vitesse au Cameroun",
    slug: "vitesses-cameroun",
    description: "60 km/h en ville, 110 km/h hors agglomération, zones 30. Toutes les règles.",
    videoUrl: "https://www.youtube.com/embed/placeholder-vitesses",
    thumbnail: "/videos/thumbnails/vitesses-cameroun.jpg",
    duration: 480,
    categorySlug: "securite",
    order: 4,
  },
  {
    title: "La ceinture de sécurité et les équipements",
    slug: "ceinture-equipements",
    description: "Port obligatoire, sièges enfants, airbags, triangle, gilet.",
    videoUrl: "https://www.youtube.com/embed/placeholder-ceinture",
    thumbnail: "/videos/thumbnails/ceinture-equipements.jpg",
    duration: 420,
    categorySlug: "securite",
    order: 5,
  },

  // ============================================
  // CONDUITE & DÉPASSEMENTS (5 vidéos)
  // ============================================
  {
    title: "Les règles du dépassement",
    slug: "regles-depassement",
    description: "Quand dépasser, comment dépasser, quand c'est interdit.",
    videoUrl: "https://www.youtube.com/embed/placeholder-depassement",
    thumbnail: "/videos/thumbnails/regles-depassement.jpg",
    duration: 540,
    categorySlug: "conduite",
    order: 1,
  },
  {
    title: "Le stationnement et les manœuvres",
    slug: "stationnement-manoeuvres",
    description: "Créneau, bataille, épi. Où stationner, où c'est interdit.",
    videoUrl: "https://www.youtube.com/embed/placeholder-stationnement",
    thumbnail: "/videos/thumbnails/stationnement.jpg",
    duration: 600,
    categorySlug: "conduite",
    order: 2,
  },
  {
    title: "Conduire sous la pluie",
    slug: "conduite-pluie",
    description: "Aquaplaning, distances doublées, visibilité réduite. Les bons réflexes.",
    videoUrl: "https://www.youtube.com/embed/placeholder-pluie",
    thumbnail: "/videos/thumbnails/conduite-pluie.jpg",
    duration: 480,
    categorySlug: "conduite",
    order: 3,
  },
  {
    title: "Entrer et sortir du véhicule en sécurité",
    slug: "entrer-sortir-vehicule",
    description: "Vérifications avant de monter, ouverture de portière, tour du véhicule.",
    videoUrl: "https://www.youtube.com/embed/placeholder-entrer-sortir",
    thumbnail: "/videos/thumbnails/entrer-sortir.jpg",
    duration: 300, // 5 min
    categorySlug: "conduite",
    order: 4,
  },
  {
    title: "L'installation au poste de conduite",
    slug: "installation-conducteur",
    description: "Réglage siège, rétroviseurs, volant, ceinture. Les vérifications avant de démarrer.",
    videoUrl: "https://www.youtube.com/embed/placeholder-installation",
    thumbnail: "/videos/thumbnails/installation-conducteur.jpg",
    duration: 360,
    categorySlug: "conduite",
    order: 5,
  },

  // ============================================
  // VISIBILITÉ & ÉCLAIRAGE (3 vidéos)
  // ============================================
  {
    title: "Les feux du véhicule",
    slug: "feux-vehicule",
    description: "Position, croisement, route, brouillard. Quand utiliser chaque type de feu.",
    videoUrl: "https://www.youtube.com/embed/placeholder-feux-vehicule",
    thumbnail: "/videos/thumbnails/feux-vehicule.jpg",
    duration: 540,
    categorySlug: "visibilite",
    order: 1,
  },
  {
    title: "Conduire de nuit",
    slug: "conduire-nuit",
    description: "Éblouissement, vitesse adaptée, distance d'éclairage, fatigue nocturne.",
    videoUrl: "https://www.youtube.com/embed/placeholder-nuit",
    thumbnail: "/videos/thumbnails/conduire-nuit.jpg",
    duration: 480,
    categorySlug: "visibilite",
    order: 2,
  },
  {
    title: "Les angles morts et les rétroviseurs",
    slug: "angles-morts",
    description: "Où sont les angles morts, comment les vérifier, réglage des rétroviseurs.",
    videoUrl: "https://www.youtube.com/embed/placeholder-angles-morts",
    thumbnail: "/videos/thumbnails/angles-morts.jpg",
    duration: 420,
    categorySlug: "visibilite",
    order: 3,
  },

  // ============================================
  // PARTAGE DE LA ROUTE (3 vidéos)
  // ============================================
  {
    title: "Piétons et passages protégés",
    slug: "pietons-passages",
    description: "Priorité des piétons, passage piéton, zones piétonnes, personnes à mobilité réduite.",
    videoUrl: "https://www.youtube.com/embed/placeholder-pietons",
    thumbnail: "/videos/thumbnails/pietons-passages.jpg",
    duration: 420,
    categorySlug: "usagers",
    order: 1,
  },
  {
    title: "Cohabiter avec les 2 roues",
    slug: "deux-roues",
    description: "Motos, vélos, motos-taxis : distances latérales, angles morts, anticipation.",
    videoUrl: "https://www.youtube.com/embed/placeholder-deux-roues",
    thumbnail: "/videos/thumbnails/deux-roues.jpg",
    duration: 480,
    categorySlug: "usagers",
    order: 2,
  },
  {
    title: "Les poids lourds et les bus",
    slug: "poids-lourds",
    description: "Angles morts des camions, dépassement sécurisé, ne pas rester à côté.",
    videoUrl: "https://www.youtube.com/embed/placeholder-poids-lourds",
    thumbnail: "/videos/thumbnails/poids-lourds.jpg",
    duration: 420,
    categorySlug: "usagers",
    order: 3,
  },

  // ============================================
  // MÉCANIQUE (3 vidéos)
  // ============================================
  {
    title: "Vérifications avant la conduite",
    slug: "verifications-avant-conduite",
    description: "Pneus, niveaux, éclairage, essuie-glaces. Le tour du véhicule.",
    videoUrl: "https://www.youtube.com/embed/placeholder-verifications",
    thumbnail: "/videos/thumbnails/verifications.jpg",
    duration: 480,
    categorySlug: "mecanique",
    order: 1,
  },
  {
    title: "Les voyants du tableau de bord",
    slug: "voyants-tableau-bord",
    description: "Rouge = danger, orange = alerte. Signification de chaque voyant.",
    videoUrl: "https://www.youtube.com/embed/placeholder-voyants",
    thumbnail: "/videos/thumbnails/voyants-tableau-bord.jpg",
    duration: 420,
    categorySlug: "mecanique",
    order: 2,
  },
  {
    title: "L'entretien des pneus",
    slug: "entretien-pneus",
    description: "Pression, usure, profondeur des sculptures, quand les changer.",
    videoUrl: "https://www.youtube.com/embed/placeholder-pneus",
    thumbnail: "/videos/thumbnails/entretien-pneus.jpg",
    duration: 360,
    categorySlug: "mecanique",
    order: 3,
  },

  // ============================================
  // ÉCO-CONDUITE (2 vidéos)
  // ============================================
  {
    title: "Les bases de l'éco-conduite",
    slug: "bases-eco-conduite",
    description: "Anticipation, rapports de vitesse, régime moteur optimal, vitesse constante.",
    videoUrl: "https://www.youtube.com/embed/placeholder-eco-conduite",
    thumbnail: "/videos/thumbnails/eco-conduite.jpg",
    duration: 420,
    categorySlug: "environnement",
    order: 1,
  },
  {
    title: "Réduire sa consommation et polluer moins",
    slug: "reduire-consommation",
    description: "Climatisation, chargement, pneus, entretien : leur impact sur la consommation.",
    videoUrl: "https://www.youtube.com/embed/placeholder-consommation",
    thumbnail: "/videos/thumbnails/reduire-consommation.jpg",
    duration: 360,
    categorySlug: "environnement",
    order: 2,
  },

  // ============================================
  // PREMIERS SECOURS (3 vidéos)
  // ============================================
  {
    title: "Protéger, Alerter, Secourir (P.A.S.)",
    slug: "proteger-alerter-secourir",
    description: "Les 3 étapes essentielles en arrivant sur un accident.",
    videoUrl: "https://www.youtube.com/embed/placeholder-pas",
    thumbnail: "/videos/thumbnails/pas.jpg",
    duration: 540,
    categorySlug: "premiers-secours",
    order: 1,
  },
  {
    title: "La Position Latérale de Sécurité (PLS)",
    slug: "position-laterale-securite",
    description: "Comment mettre une victime inconsciente qui respire en PLS.",
    videoUrl: "https://www.youtube.com/embed/placeholder-pls",
    thumbnail: "/videos/thumbnails/pls.jpg",
    duration: 420,
    categorySlug: "premiers-secours",
    order: 2,
  },
  {
    title: "Les gestes qui sauvent",
    slug: "gestes-qui-sauvent",
    description: "Massage cardiaque, arrêter un saignement, ne pas déplacer un blessé.",
    videoUrl: "https://www.youtube.com/embed/placeholder-gestes",
    thumbnail: "/videos/thumbnails/gestes-sauvent.jpg",
    duration: 600,
    categorySlug: "premiers-secours",
    order: 3,
  },

  // ============================================
  // ADMINISTRATIF (2 vidéos)
  // ============================================
  {
    title: "Le permis de conduire au Cameroun",
    slug: "permis-cameroun",
    description: "Catégories, âge minimum, documents obligatoires, procédure d'obtention.",
    videoUrl: "https://www.youtube.com/embed/placeholder-permis",
    thumbnail: "/videos/thumbnails/permis-cameroun.jpg",
    duration: 480,
    categorySlug: "administratif",
    order: 1,
  },
  {
    title: "Que faire en cas d'accident ?",
    slug: "que-faire-accident",
    description: "Constat amiable, appeler les secours, ne pas fuir, assurance.",
    videoUrl: "https://www.youtube.com/embed/placeholder-accident",
    thumbnail: "/videos/thumbnails/que-faire-accident.jpg",
    duration: 420,
    categorySlug: "administratif",
    order: 2,
  },
];
