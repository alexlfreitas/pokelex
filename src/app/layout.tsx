import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PokeLex - The Alex's Pokedex 😎",
  description: "Info about Pokemons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={font.className}>
      <body className="bg-gray-300">
        <div className="pokedex-content h-screen">
          <Navbar></Navbar>
          <Header></Header>
          <main className="p-5 max-h-max overflow-y-auto">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
