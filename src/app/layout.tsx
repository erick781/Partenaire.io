import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partenaire.io — Growth Partner Command Center",
  description:
    "Votre partenaire de croissance. Dashboard de gestion et AI CFO.",
  keywords: [
    "croissance",
    "marketing digital",
    "AI CFO",
    "finance",
    "publicité",
    "Québec",
    "Canada",
  ],
  openGraph: {
    title: "Partenaire.io — Growth Partner Command Center",
    description:
      "Votre partenaire de croissance. Plus de 300 entreprises propulsées.",
    type: "website",
    locale: "fr_CA",
    siteName: "Partenaire.io",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
