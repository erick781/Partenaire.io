import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Partenaire.io — Expert en Croissance",
  description:
    "La dernière agence dont vous aurez besoin. Nous aidons les entrepreneurs, concessionnaires, courtiers et restaurateurs à devenir #1 dans leur secteur grâce au contenu vidéo et à la publicité numérique.",
  keywords: [
    "croissance",
    "contenu vidéo",
    "short form content",
    "publicité numérique",
    "médias sociaux",
    "Québec",
    "Laval",
    "Viktor St-Jacques",
    "partenaire",
  ],
  openGraph: {
    title: "Partenaire.io — Expert en Croissance",
    description:
      "La dernière agence dont vous aurez besoin. 300+ entreprises propulsées.",
    type: "website",
    locale: "fr_CA",
    siteName: "Partenaire.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-noir text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
