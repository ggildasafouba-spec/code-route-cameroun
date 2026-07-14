import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PWARegister } from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "Code Route Cameroun - Formation en ligne",
  description:
    "Préparez votre examen du code de la route au Cameroun. QCM, vidéos, examens blancs. Formation complète en ligne.",
  keywords: [
    "code de la route",
    "cameroun",
    "permis de conduire",
    "formation en ligne",
    "QCM",
    "examen blanc",
  ],
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Code Route CM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <PWARegister />
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
