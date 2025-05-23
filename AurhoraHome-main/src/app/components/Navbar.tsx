"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-md shadow-lg shadow-black/20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-teal-400 via-fuchsia-500 to-lime-400 bg-clip-text text-transparent">
            Aurhora
          </span>{" "}
          <span className="text-gray-300">Agency</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="#servicios"
            className="text-gray-300 hover:text-teal-400 font-medium transition duration-300"
          >
            Servicios
          </Link>
          <Link
            href="#enfoque"
            className="text-gray-300 hover:text-teal-400 font-medium transition duration-300"
          >
            Enfoque
          </Link>
          <Link
            href="#nosotros"
            className="text-gray-300 hover:text-teal-400 font-medium transition duration-300"
          >
            Nosotros
          </Link>
          <Link
            href="#contacto"
            className="bg-teal-400 text-white font-semibold py-2 px-6 rounded-full text-sm hover:bg-teal-500 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Agendar Sesión
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="#servicios"
              className="block text-gray-300 hover:text-teal-400 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="#enfoque"
              className="block text-gray-300 hover:text-teal-400 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Enfoque
            </Link>
            <Link
              href="#nosotros"
              className="block text-gray-300 hover:text-teal-400 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="#contacto"
              className="block bg-teal-400 text-white font-semibold py-2 px-6 rounded-full text-sm text-center hover:bg-teal-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar Sesión
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
