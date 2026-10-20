import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Dossou Christian — Portfolio",description:"Étudiant en informatique. Projets web, intelligence artificielle et explorations créatives."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="fr"><body>{children}</body></html>}