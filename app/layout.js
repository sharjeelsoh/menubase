// /app/layout.js
"use client";

import Link from "next/link";
import './globals.css';
import { Suspense } from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io"; // icons for toggle
import { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body>
      
        {/* HEADER */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              menubase
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link href="/partners" className="text-gray-700 hover:text-gray-900">
                Partners
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </nav>

            {/* Auth buttons (desktop) */}
            <div className="hidden md:flex items-center gap-4">

              <Link href="/signup" className="text-gray-700 hover:text-gray-900">
                Signup
              </Link>

              <Link
                href="/login"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-gray-800"
            >
              {menuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
          </div>

          {/* MOBILE DRAWER */}
          <Transition appear show={menuOpen} as={Fragment}>
            <div className="fixed inset-0 z-50 md:hidden">


              {/* Slide-in panel */}
              <Transition.Child
                as={Fragment}
                enter="transition-transform duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="self-end text-2xl mb-6 text-gray-800"
                  >
                    <IoMdClose />
                  </button>

                  <nav className="flex flex-col space-y-4">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link href="/partners" onClick={() => setMenuOpen(false)}>Partners</Link>
                    <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

                    <div className="border-t pt-4 mt-4 flex flex-col gap-3">
                      <Link href="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Login
                      </Link>
                    </div>
                  </nav>
                </div>
              </Transition.Child>
            </div>
          </Transition>
        </header>
        
        {/* Main */}
        <main className="flex flex-col items-center justify-center text-center m-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl">
            <Suspense>
              {children}
            </Suspense>
          </div>
        </main>
      </body>
    </html>
  );
}