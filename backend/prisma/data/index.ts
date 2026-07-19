/**
 * INDEX DE TOUTES LES QUESTIONS
 * Total : 500+ questions réparties sur 10 thèmes
 */

// Signalisation (55 + 30 = 85 questions)
export { signalisationQuestions } from "./questions";
export { signalisation2Questions } from "./questions-signalisation-2";

// Priorités (17 + 18 = 35 questions)
export { prioritesQuestions } from "./questions-priorites";
export { priorites2Questions } from "./questions-priorites-2";

// Sécurité & vitesse (24 + 17 = 41 questions)
export { securiteQuestions } from "./questions-securite";
export { securite2Questions } from "./questions-securite-2";

// Conduite & dépassements (18 + 25 = 43 questions)
export { conduiteQuestions } from "./questions-conduite";
export { conduite2Questions } from "./questions-conduite-2";

// Visibilité & éclairage (15 questions)
export { visibiliteQuestions } from "./questions-visibilite";

// Partage de la route (13 + 15 = 28 questions)
export { usagersQuestions } from "./questions-usagers";
export { usagers2Questions } from "./questions-usagers-2";

// Mécanique & équipements (12 + 15 = 27 questions)
export { mecaniqueQuestions } from "./questions-mecanique";
export { mecanique2Questions } from "./questions-mecanique-2";

// Éco-conduite & environnement (10 + 10 = 20 questions)
export { environnementQuestions } from "./questions-environnement";
export { environnement2Questions } from "./questions-environnement-2";

// Premiers secours (10 + 20 questions)
export { secoursQuestions } from "./questions-secours";
export { secours2Questions } from "./questions-secours-2";

// Infractions & administratif (12 + 20 questions)
export { administratifQuestions } from "./questions-administratif";
export { administratif2Questions } from "./questions-administratif-2";

// Visibilité - Partie 2 (15 questions supplémentaires)
export { visibilite2Questions } from "./questions-visibilite-2";

// Signalisation - Partie 3 (25 questions supplémentaires)
export { signalisation3Questions } from "./questions-signalisation-3";

// Mises en situation (20 + 20 questions transversales)
export { situationsQuestions } from "./questions-situations";
export { situations2Questions } from "./questions-situations-2";

// Complément final (toutes catégories)
export { complementQuestions, complement2Questions } from "./questions-complement";

// Questions finales
export { finalQuestions } from "./questions-final";

// Nouvelles séries supplémentaires
export { signalisation4Questions } from "./questions-signalisation-4";
export { priorites3Questions } from "./questions-priorites-3";
export { securite3Questions } from "./questions-securite-3";
export { conduite3Questions } from "./questions-conduite-3";

// Vidéos
export { videosData } from "./videos";

/**
 * TOTAL ESTIMÉ : ~500+ questions
 * 
 * Répartition :
 * - Signalisation : ~85 questions
 * - Priorités : ~35 questions
 * - Sécurité & vitesse : ~41 questions
 * - Conduite & dépassements : ~43 questions
 * - Visibilité : ~15 questions
 * - Partage de la route : ~28 questions
 * - Mécanique : ~27 questions
 * - Éco-conduite : ~20 questions
 * - Premiers secours : ~10 questions
 * - Administratif : ~12 questions
 * 
 * Vidéos : 40 vidéos réparties sur 10 thèmes
 */

// Catégories pour le seed
export const quizCategoriesData = [
  { title: "Signalisation routière", slug: "signalisation", description: "Panneaux, feux, marquages au sol", icon: "🚦" },
  { title: "Règles de priorité", slug: "priorites", description: "Intersections, ronds-points, cédez le passage", icon: "➡️" },
  { title: "Sécurité & vitesse", slug: "securite", description: "Distances, vitesses, alcool, fatigue", icon: "🛡️" },
  { title: "Conduite & dépassements", slug: "conduite", description: "Dépassements, manœuvres, stationnement", icon: "🚗" },
  { title: "Visibilité & éclairage", slug: "visibilite", description: "Feux, brouillard, conduite de nuit", icon: "💡" },
  { title: "Partage de la route", slug: "usagers", description: "Piétons, cyclistes, motos, animaux", icon: "👥" },
  { title: "Mécanique & équipements", slug: "mecanique", description: "Pneus, freins, moteur, entretien", icon: "🔧" },
  { title: "Éco-conduite & environnement", slug: "environnement", description: "Consommation, pollution, bons gestes", icon: "🌍" },
  { title: "Premiers secours", slug: "premiers-secours", description: "Gestes d'urgence, PAS, PLS", icon: "🏥" },
  { title: "Infractions & administratif", slug: "administratif", description: "Permis, assurance, sanctions", icon: "📋" },
];
