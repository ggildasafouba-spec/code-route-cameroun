// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  // === Créer un admin ===
  const adminPassword = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { phone: "+237600000000" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "CodeRoute",
      phone: "+237600000000",
      email: "admin@coderoute.cm",
      password: adminPassword,
      role: "ADMIN",
      city: "Douala",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // === Créer des auto-écoles partenaires ===
  const aePassword = await bcrypt.hash("autoecole123", 10);

  const ae1Owner = await prisma.user.upsert({
    where: { phone: "+237691234567" },
    update: {},
    create: {
      firstName: "Paul",
      lastName: "Nganou",
      phone: "+237691234567",
      email: "excellence@autoecole.cm",
      password: aePassword,
      role: "AUTO_ECOLE",
      city: "Douala",
    },
  });

  await prisma.autoEcole.upsert({
    where: { ownerId: ae1Owner.id },
    update: {},
    create: {
      name: "Auto-École Excellence",
      city: "Douala",
      address: "Rue de la Joie, Akwa",
      phone: "+237691234567",
      description: "Auto-école réputée avec plus de 10 ans d'expérience. Taux de réussite élevé.",
      isVerified: true,
      isPartner: true,
      commissionRate: 7500,
      examPrice: 25000,
      rating: 4.5,
      ownerId: ae1Owner.id,
    },
  });

  const ae2Owner = await prisma.user.upsert({
    where: { phone: "+237699456789" },
    update: {},
    create: {
      firstName: "Marie",
      lastName: "Fotso",
      phone: "+237699456789",
      email: "centre@autoecole.cm",
      password: aePassword,
      role: "AUTO_ECOLE",
      city: "Yaoundé",
    },
  });

  await prisma.autoEcole.upsert({
    where: { ownerId: ae2Owner.id },
    update: {},
    create: {
      name: "Auto-École du Centre",
      city: "Yaoundé",
      address: "Carrefour Nlongkak",
      phone: "+237699456789",
      description: "La meilleure auto-école de Yaoundé. Accompagnement personnalisé.",
      isVerified: true,
      isPartner: true,
      commissionRate: 7500,
      examPrice: 22000,
      rating: 4.7,
      ownerId: ae2Owner.id,
    },
  });

  console.log("✅ Auto-écoles partenaires créées");

  // === Catégories de cours ===
  const courseCategories = [
    {
      title: "Signalisation routière",
      slug: "signalisation",
      description:
        "Panneaux d'interdiction, d'obligation, de danger et d'indication",
      icon: "SignalHigh",
      order: 1,
    },
    {
      title: "Règles de priorité",
      slug: "priorites",
      description: "Intersections, rond-points, priorité à droite",
      icon: "ArrowRight",
      order: 2,
    },
    {
      title: "Sécurité routière",
      slug: "securite",
      description: "Distances de sécurité, freinage, conditions météo",
      icon: "Shield",
      order: 3,
    },
    {
      title: "Visibilité et éclairage",
      slug: "visibilite",
      description: "Feux, éclairage, conduite de nuit, brouillard",
      icon: "Eye",
      order: 4,
    },
    {
      title: "Croisements et dépassements",
      slug: "croisements",
      description: "Règles de dépassement, voies de circulation",
      icon: "Car",
      order: 5,
    },
    {
      title: "Partage de la route",
      slug: "usagers",
      description: "Piétons, cyclistes, motos, poids lourds",
      icon: "Users",
      order: 6,
    },
    {
      title: "Infractions et sanctions",
      slug: "infractions",
      description: "Contraventions, délits, retrait de points, amendes",
      icon: "AlertTriangle",
      order: 7,
    },
  ];

  for (const cat of courseCategories) {
    await prisma.courseCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: { ...cat, isPublished: true },
    });
  }
  console.log("✅ Catégories de cours créées");

  // === Catégories de QCM ===
  const quizCategories = [
    {
      title: "Signalisation",
      slug: "signalisation",
      description: "Questions sur les panneaux et la signalisation",
      icon: "🚦",
    },
    {
      title: "Priorités",
      slug: "priorites",
      description: "Questions sur les règles de priorité",
      icon: "➡️",
    },
    {
      title: "Sécurité",
      slug: "securite",
      description: "Questions sur la sécurité routière",
      icon: "🛡️",
    },
    {
      title: "Conduite",
      slug: "conduite",
      description: "Questions sur les techniques de conduite",
      icon: "🚗",
    },
  ];

  for (const cat of quizCategories) {
    await prisma.quizCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Catégories de QCM créées");

  // === Questions de QCM ===
  const signalisationCat = await prisma.quizCategory.findUnique({
    where: { slug: "signalisation" },
  });

  const prioritesCat = await prisma.quizCategory.findUnique({
    where: { slug: "priorites" },
  });

  const securiteCat = await prisma.quizCategory.findUnique({
    where: { slug: "securite" },
  });

  if (signalisationCat && prioritesCat && securiteCat) {
    const questions = [
      {
        text: "Que signifie un panneau triangulaire bordé de rouge ?",
        explanation:
          "Les panneaux triangulaires bordés de rouge sont des panneaux de danger. Ils avertissent le conducteur d'un danger potentiel.",
        categoryId: signalisationCat.id,
        difficulty: 1,
        answers: [
          { text: "Un panneau d'interdiction", isCorrect: false },
          { text: "Un panneau de danger", isCorrect: true },
          { text: "Un panneau d'obligation", isCorrect: false },
          { text: "Un panneau d'indication", isCorrect: false },
        ],
      },
      {
        text: "Un panneau rond à fond bleu indique :",
        explanation:
          "Les panneaux ronds à fond bleu sont des panneaux d'obligation.",
        categoryId: signalisationCat.id,
        difficulty: 1,
        answers: [
          { text: "Une interdiction", isCorrect: false },
          { text: "Un danger", isCorrect: false },
          { text: "Une obligation", isCorrect: true },
          { text: "Une indication", isCorrect: false },
        ],
      },
      {
        text: "Un panneau rond à fond blanc bordé de rouge indique :",
        explanation:
          "Les panneaux ronds à fond blanc bordé de rouge sont des panneaux d'interdiction.",
        categoryId: signalisationCat.id,
        difficulty: 1,
        answers: [
          { text: "Une obligation", isCorrect: false },
          { text: "Une interdiction", isCorrect: true },
          { text: "Un danger", isCorrect: false },
          { text: "Une fin d'interdiction", isCorrect: false },
        ],
      },
      {
        text: "À une intersection sans signalisation, quelle est la règle ?",
        explanation:
          "En l'absence de signalisation, c'est la priorité à droite qui s'applique.",
        categoryId: prioritesCat.id,
        difficulty: 1,
        answers: [
          { text: "Priorité à gauche", isCorrect: false },
          { text: "Priorité au premier arrivé", isCorrect: false },
          { text: "Priorité à droite", isCorrect: true },
          { text: "Pas de règle", isCorrect: false },
        ],
      },
      {
        text: "Dans un rond-point, qui a la priorité ?",
        explanation:
          "Les véhicules déjà engagés dans le rond-point ont la priorité sur ceux qui entrent.",
        categoryId: prioritesCat.id,
        difficulty: 2,
        answers: [
          { text: "Celui qui entre", isCorrect: false },
          { text: "Celui déjà dans le rond-point", isCorrect: true },
          { text: "Le plus gros véhicule", isCorrect: false },
          { text: "Priorité à droite", isCorrect: false },
        ],
      },
      {
        text: "Quelle est la distance de sécurité recommandée en ville ?",
        explanation:
          "En ville, il faut maintenir au minimum 2 secondes de distance avec le véhicule précédent.",
        categoryId: securiteCat.id,
        difficulty: 2,
        answers: [
          { text: "1 seconde", isCorrect: false },
          { text: "2 secondes", isCorrect: true },
          { text: "5 secondes", isCorrect: false },
          { text: "Il n'y a pas de règle", isCorrect: false },
        ],
      },
      {
        text: "Le taux d'alcoolémie maximum autorisé au Cameroun est de :",
        explanation:
          "Au Cameroun, le taux d'alcoolémie maximum autorisé est de 0,8 g/l de sang.",
        categoryId: securiteCat.id,
        difficulty: 2,
        answers: [
          { text: "0,0 g/l", isCorrect: false },
          { text: "0,5 g/l", isCorrect: false },
          { text: "0,8 g/l", isCorrect: true },
          { text: "1,0 g/l", isCorrect: false },
        ],
      },
    ];

    for (const q of questions) {
      const { answers, ...questionData } = q;
      await prisma.question.create({
        data: {
          ...questionData,
          answers: {
            create: answers,
          },
        },
      });
    }
    console.log("✅ Questions de QCM créées");
  }

  // === Catégories de vidéos ===
  const videoCategories = [
    {
      title: "Signalisation",
      slug: "signalisation",
      description: "Vidéos sur les panneaux et signalisation",
      order: 1,
    },
    {
      title: "Priorités et intersections",
      slug: "priorites",
      description: "Vidéos sur les règles de priorité",
      order: 2,
    },
    {
      title: "Sécurité et conduite",
      slug: "securite",
      description: "Vidéos sur la sécurité routière",
      order: 3,
    },
  ];

  for (const cat of videoCategories) {
    await prisma.videoCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Catégories de vidéos créées");

  // === Examens blancs ===
  await prisma.exam.create({
    data: {
      title: "Examen blanc #1",
      description: "Premier examen blanc - Niveau débutant",
      totalQuestions: 40,
      timeLimit: 1800,
      passingScore: 28,
      isPublished: true,
    },
  });

  await prisma.exam.create({
    data: {
      title: "Examen blanc #2",
      description: "Deuxième examen blanc - Niveau intermédiaire",
      totalQuestions: 40,
      timeLimit: 1800,
      passingScore: 28,
      isPublished: true,
    },
  });

  await prisma.exam.create({
    data: {
      title: "Examen blanc #3",
      description: "Troisième examen blanc - Niveau avancé",
      totalQuestions: 40,
      timeLimit: 1800,
      passingScore: 32,
      isPublished: true,
    },
  });
  console.log("✅ Examens blancs créés");

  console.log("🎉 Seeding terminé !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
