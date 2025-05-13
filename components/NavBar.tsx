"use client";

import { FaGithub, FaFileCode } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white px-6 py-4 shadow-sm border-[0.5px] border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-gray-700 hover:text-black">
            <span className="text-xl md:text-2xl font-bold text-black">
              Autis<span className="text-blue-500">Buddy</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="https://github.com/Aadityaa2606/Autis_Buddy"
            className="text-gray-700 hover:text-black flex items-center space-x-1"
          >
            <FaGithub size={20} />
            <span>GitHub</span>
          </Link>
          <Link
            href="/howto"
            className="text-gray-700 hover:text-black flex items-center space-x-1"
          >
            <FaFileCode size={20} />
            <span>How ?</span>
          </Link>
          <Link
            href="/upload"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-col space-y-4 px-2 pb-3">
            <Link
              href="https://github.com/Aadityaa2606/Autis_Buddy"
              className="text-gray-700 hover:text-black flex items-center space-x-1 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </Link>
            <Link
              href="/howto"
              className="text-gray-700 hover:text-black flex items-center space-x-1 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaFileCode size={18} />
              <span>How ?</span>
            </Link>
            <Link
              href="/upload"
              className="text-gray-700 hover:text-black flex items-center space-x-1 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
