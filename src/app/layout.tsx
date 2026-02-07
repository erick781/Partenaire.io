import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Partenaire.io — Expert en Croissance",
  description:
    "Votre partenaire de croissance. Nous aidons les entrepreneurs, concessionnaires, courtiers et restaurateurs à devenir #1 dans leur secteur grâce au contenu et à la publicité numérique.",
  keywords: [
    "croissance",
    "marketing digital",
    "contenu vidéo",
    "publicité",
    "médias sociaux",
    "Québec",
    "Canada",
  ],
  openGraph: {
    title: "Partenaire.io — Expert en Croissance",
    description:
      "Votre partenaire de croissance. Plus de 300 entreprises propulsées.",
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
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
