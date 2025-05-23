import "./globals.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from 'next'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aurhora Agency",
  description: "Orquestando innovación y resultados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
