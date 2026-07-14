# 🚗 Code Route Cameroun - Formation en ligne

Application de formation au code de la route en ligne pour le Cameroun.
Inspirée du système de formation français (QCM, vidéos, examens blancs).

## Architecture Technique

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND                         │
│        Next.js 14 + TypeScript + Tailwind        │
│              Hébergé sur Vercel                   │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                  BACKEND                          │
│      NestJS + Prisma + PostgreSQL + Redis         │
│             Hébergé sur Railway                   │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│             SERVICES EXTERNES                     │
│   NotchPay (MTN MoMo + Orange Money) — Redis     │
└─────────────────────────────────────────────────┘
```

## Fonctionnalités principales

- 📚 **Cours en ligne** — Leçons structurées par thème (signalisation, priorités, etc.)
- 🎬 **Vidéos pédagogiques** — Explications visuelles des situations de conduite
- ✅ **QCM interactifs** — Questions à choix multiples avec correction instantanée
- 📝 **Examens blancs** — Simulation chronométrée (40 questions, 30 minutes)
- 📊 **Suivi de progression** — Statistiques détaillées, points faibles identifiés
- 💳 **Paiement Mobile Money** — MTN MoMo + Orange Money via NotchPay
- 🌐 **Bilingue** — Français + Anglais
- 📱 **Mode hors-ligne** — Révision sans connexion internet

## Rôles utilisateurs

| Rôle | Fonctions |
|------|-----------|
| 🎓 Élève | Suit les cours, passe les QCM et examens blancs |
| 🏫 Auto-école | Gère ses élèves, suit leurs résultats |
| 👨‍💼 Administrateur | Gère le contenu, les paiements, les auto-écoles |

## Stack technique

- **Frontend** : Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : NestJS, Prisma ORM, PostgreSQL, Redis
- **Paiements** : NotchPay (MTN MoMo, Orange Money)
- **Vidéos** : Cloudinary / Mux
- **Hébergement** : Vercel (front) + Railway (back)
