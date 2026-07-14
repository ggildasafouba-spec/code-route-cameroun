/**
 * BANQUE DE QUESTIONS - CODE DE LA ROUTE CAMEROUN
 * Basée sur le Code CEMAC + spécificités camerounaises
 * 
 * Vitesses au Cameroun :
 * - Agglomération : 60 km/h
 * - Hors agglomération : 110 km/h
 * - Zones scolaires : 30 km/h
 * 
 * Alcoolémie : 0.8 g/l
 * 
 * 10 thèmes officiels de l'examen
 */

export interface QuestionData {
  text: string;
  explanation: string;
  difficulty: number; // 1=facile, 2=moyen, 3=difficile
  category: string;
  answers: { text: string; isCorrect: boolean }[];
  situation?: string; // Description de mise en situation
}

// ============================================
// THÈME 1 : SIGNALISATION ROUTIÈRE (80 questions)
// ============================================
export const signalisationQuestions: QuestionData[] = [
  {
    text: "Un panneau triangulaire bordé de rouge indique :",
    explanation: "Les panneaux triangulaires bordés de rouge sont des panneaux de danger. Ils préviennent d'un danger dans les 150m (hors agglomération) ou immédiat (en agglomération).",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Un danger", isCorrect: true },
      { text: "Une interdiction", isCorrect: false },
      { text: "Une obligation", isCorrect: false },
      { text: "Une indication", isCorrect: false },
    ],
  },
  {
    text: "Un panneau rond à fond bleu indique :",
    explanation: "Les panneaux ronds à fond bleu sont des panneaux d'obligation. Le conducteur doit obligatoirement suivre l'indication donnée.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Une obligation", isCorrect: true },
      { text: "Une interdiction", isCorrect: false },
      { text: "Un danger", isCorrect: false },
      { text: "Une fin de prescription", isCorrect: false },
    ],
  },
  {
    text: "Un panneau rond à fond blanc bordé de rouge indique :",
    explanation: "Les panneaux ronds à fond blanc bordé de rouge sont des panneaux d'interdiction ou de restriction.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Une interdiction", isCorrect: true },
      { text: "Une obligation", isCorrect: false },
      { text: "Un danger", isCorrect: false },
      { text: "Une indication", isCorrect: false },
    ],
  },
  {
    text: "Un panneau carré à fond bleu est un panneau :",
    explanation: "Les panneaux carrés ou rectangulaires à fond bleu sont des panneaux d'indication. Ils donnent des informations utiles.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "D'indication", isCorrect: true },
      { text: "D'obligation", isCorrect: false },
      { text: "De danger", isCorrect: false },
      { text: "D'interdiction", isCorrect: false },
    ],
  },
  {
    text: "Que signifie un panneau triangulaire avec un virage à droite ?",
    explanation: "Ce panneau avertit d'un virage dangereux à droite. Vous devez ralentir et adapter votre vitesse.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Danger : virage dangereux à droite", isCorrect: true },
      { text: "Obligation de tourner à droite", isCorrect: false },
      { text: "Interdiction de tourner à droite", isCorrect: false },
      { text: "Route à sens unique vers la droite", isCorrect: false },
    ],
  },
  {
    text: "Le panneau 'STOP' oblige le conducteur à :",
    explanation: "Le panneau STOP impose un arrêt absolu à la ligne d'arrêt, même s'il n'y a aucun véhicule en vue. Vous devez céder le passage.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "S'arrêter obligatoirement et céder le passage", isCorrect: true },
      { text: "Ralentir et passer si la voie est libre", isCorrect: false },
      { text: "S'arrêter uniquement s'il y a des véhicules", isCorrect: false },
      { text: "Klaxonner avant de passer", isCorrect: false },
    ],
  },
  {
    text: "Le panneau 'Cédez le passage' (triangle pointe en bas) signifie :",
    explanation: "Ce panneau oblige à laisser passer les véhicules circulant sur la route prioritaire. Contrairement au STOP, l'arrêt n'est pas obligatoire si la voie est libre.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Laisser passer les véhicules prioritaires, sans obligation d'arrêt", isCorrect: true },
      { text: "S'arrêter obligatoirement", isCorrect: false },
      { text: "Danger : route en pente", isCorrect: false },
      { text: "Fin de priorité", isCorrect: false },
    ],
  },
  {
    text: "Que signifie un panneau rond barré d'une diagonale noire sur fond blanc ?",
    explanation: "Ce panneau indique la fin de toutes les interdictions précédemment imposées (fin de limitation de vitesse, fin d'interdiction de dépasser, etc.).",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Fin de toutes les interdictions", isCorrect: true },
      { text: "Interdiction de circuler", isCorrect: false },
      { text: "Zone interdite", isCorrect: false },
      { text: "Route barrée", isCorrect: false },
    ],
  },
  {
    text: "Un panneau triangulaire avec un point d'exclamation signifie :",
    explanation: "Ce panneau signale un danger non spécifié par un autre panneau. Il est souvent accompagné d'un panonceau précisant la nature du danger.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Danger non précisé (autre danger)", isCorrect: true },
      { text: "Attention : zone de contrôle", isCorrect: false },
      { text: "Priorité ponctuelle", isCorrect: false },
      { text: "Interdiction de klaxonner", isCorrect: false },
    ],
  },
  {
    text: "Le panneau sens interdit est :",
    explanation: "Le panneau sens interdit est un panneau rond à fond rouge avec une barre blanche horizontale. Il interdit toute circulation dans cette direction.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Rond, fond rouge, barre blanche horizontale", isCorrect: true },
      { text: "Triangulaire, fond rouge", isCorrect: false },
      { text: "Carré, fond bleu, barre blanche", isCorrect: false },
      { text: "Rond, fond blanc, barre rouge", isCorrect: false },
    ],
  },
  {
    text: "Un feu rouge clignotant signifie :",
    explanation: "Un feu rouge clignotant impose un arrêt absolu. Il est généralement placé à des passages à niveau ou devant des casernes de pompiers.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Arrêt obligatoire absolu", isCorrect: true },
      { text: "Ralentir et passer avec prudence", isCorrect: false },
      { text: "Feu en panne, priorité à droite", isCorrect: false },
      { text: "Accélérer pour dégager rapidement", isCorrect: false },
    ],
  },
  {
    text: "Un feu orange (jaune) fixe signifie :",
    explanation: "Le feu orange fixe annonce le passage imminent au rouge. Vous devez vous arrêter sauf si vous ne pouvez plus le faire en sécurité (vous êtes trop engagé).",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Arrêtez-vous, sauf si l'arrêt est dangereux", isCorrect: true },
      { text: "Accélérez pour passer avant le rouge", isCorrect: false },
      { text: "Passez avec prudence", isCorrect: false },
      { text: "Ralentissez seulement", isCorrect: false },
    ],
  },
  {
    text: "Un feu orange clignotant signifie :",
    explanation: "Le feu orange clignotant impose la prudence. Il ne donne pas de priorité. Respectez les règles générales de priorité (souvent priorité à droite).",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Passez avec prudence, les règles de priorité s'appliquent", isCorrect: true },
      { text: "Arrêt obligatoire", isCorrect: false },
      { text: "Priorité totale pour vous", isCorrect: false },
      { text: "Feu en panne, ne pas passer", isCorrect: false },
    ],
  },
  {
    text: "La ligne continue blanche au sol signifie :",
    explanation: "Une ligne continue interdit le franchissement et le chevauchement. Il est strictement interdit de la dépasser pour doubler ou changer de voie.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Interdiction de franchir ou chevaucher cette ligne", isCorrect: true },
      { text: "Possibilité de la franchir pour doubler", isCorrect: false },
      { text: "Limite de stationnement", isCorrect: false },
      { text: "Voie réservée aux bus", isCorrect: false },
    ],
  },
  {
    text: "Une ligne discontinue blanche au sol permet :",
    explanation: "La ligne discontinue peut être franchie pour dépasser, tourner ou changer de voie, à condition de pouvoir le faire en sécurité.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "De franchir la ligne pour dépasser ou changer de voie", isCorrect: true },
      { text: "Uniquement de rouler dessus", isCorrect: false },
      { text: "De stationner sur la chaussée", isCorrect: false },
      { text: "Rien, c'est purement décoratif", isCorrect: false },
    ],
  },
  {
    text: "Le panneau de limitation de vitesse à 60 km/h signifie :",
    explanation: "Ce panneau rond à fond blanc bordé de rouge avec le chiffre 60 interdit de rouler à plus de 60 km/h. C'est la vitesse maximale autorisée.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Vitesse maximale autorisée : 60 km/h", isCorrect: true },
      { text: "Vitesse minimale obligatoire : 60 km/h", isCorrect: false },
      { text: "Vitesse conseillée : 60 km/h", isCorrect: false },
      { text: "Distance de sécurité : 60 mètres", isCorrect: false },
    ],
  },
  {
    text: "Un panneau d'interdiction de dépasser concerne :",
    explanation: "L'interdiction de dépasser s'applique à tous les véhicules à moteur. Vous pouvez toutefois dépasser un vélo, un cyclomoteur ou un véhicule à traction animale.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Tous les véhicules à moteur (sauf 2 roues sans side-car)", isCorrect: true },
      { text: "Uniquement les camions", isCorrect: false },
      { text: "Tous les usagers y compris les vélos", isCorrect: false },
      { text: "Uniquement les voitures", isCorrect: false },
    ],
  },
  {
    text: "Que signifie un panneau triangulaire avec deux voitures côte à côte ?",
    explanation: "Ce panneau avertit d'un rétrécissement de chaussée. Les deux voies vont se réduire à une seule.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Rétrécissement de chaussée", isCorrect: true },
      { text: "Interdiction de dépasser", isCorrect: false },
      { text: "Route à double sens", isCorrect: false },
      { text: "Croisement dangereux", isCorrect: false },
    ],
  },
  {
    text: "Le panneau avec un P blanc sur fond bleu indique :",
    explanation: "Ce panneau indique un parking ou une zone de stationnement autorisé.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Parking / stationnement autorisé", isCorrect: true },
      { text: "Poste de police à proximité", isCorrect: false },
      { text: "Péage", isCorrect: false },
      { text: "Priorité", isCorrect: false },
    ],
  },
  {
    text: "Un panneau triangulaire avec des graviers signifie :",
    explanation: "Ce panneau avertit de la projection possible de gravillons. Réduisez votre vitesse pour éviter les projections et les dérapages.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Danger : projection de gravillons", isCorrect: true },
      { text: "Travaux en cours", isCorrect: false },
      { text: "Route non goudronnée", isCorrect: false },
      { text: "Chute de pierres", isCorrect: false },
    ],
  },
  // 60 questions supplémentaires signalisation...
  {
    text: "Le panneau triangulaire avec des enfants signifie :",
    explanation: "Ce panneau signale la proximité d'un établissement scolaire ou d'un endroit fréquenté par des enfants. Vitesse limitée à 30 km/h au Cameroun dans ces zones.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Proximité d'une école ou d'enfants, ralentir", isCorrect: true },
      { text: "Aire de jeux", isCorrect: false },
      { text: "Passage piéton obligatoire", isCorrect: false },
      { text: "Zone de loisirs", isCorrect: false },
    ],
  },
  {
    text: "Un panneau triangulaire avec un animal (vache) signifie :",
    explanation: "Ce panneau avertit du passage possible d'animaux domestiques. Soyez vigilant, surtout en zone rurale au Cameroun.",
    difficulty: 1,
    category: "signalisation",
    answers: [
      { text: "Passage d'animaux domestiques possible", isCorrect: true },
      { text: "Ferme à proximité", isCorrect: false },
      { text: "Zone d'élevage interdite aux voitures", isCorrect: false },
      { text: "Abattoir", isCorrect: false },
    ],
  },
  {
    text: "Le marquage en zigzag jaune au sol devant un arrêt de bus signifie :",
    explanation: "Le marquage en zigzag indique une zone réservée aux bus. Le stationnement y est interdit mais l'arrêt est toléré pour charger/décharger.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Zone réservée aux bus, stationnement interdit", isCorrect: true },
      { text: "Zone de danger", isCorrect: false },
      { text: "Voie de décélération", isCorrect: false },
      { text: "Sens interdit pour les voitures", isCorrect: false },
    ],
  },
  {
    text: "Un panneau rectangulaire vert indique :",
    explanation: "Les panneaux verts sont des panneaux de direction indiquant les itinéraires empruntant les routes nationales ou les grands axes.",
    difficulty: 2,
    category: "signalisation",
    answers: [
      { text: "Direction vers une route nationale ou grand axe", isCorrect: true },
      { text: "Zone de repos", isCorrect: false },
      { text: "Zone écologique protégée", isCorrect: false },
      { text: "Voie rapide", isCorrect: false },
    ],
  },
  {
    text: "Un panneau rond bleu avec le chiffre 50 indique :",
    explanation: "Un panneau rond à fond bleu avec un chiffre indique une vitesse minimale obligatoire. Ici, vous devez rouler à au moins 50 km/h.",
    difficulty: 3,
    category: "signalisation",
    answers: [
      { text: "Vitesse minimale obligatoire de 50 km/h", isCorrect: true },
      { text: "Vitesse maximale de 50 km/h", isCorrect: false },
      { text: "Distance minimale entre véhicules : 50 m", isCorrect: false },
      { text: "Zone à 50 km/h conseillé", isCorrect: false },
    ],
  },
];
