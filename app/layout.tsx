"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Brain, Menu } from "lucide-react";
import "./globals.css";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
        >
          {/* Redesigned Navbar */}
          <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
            <nav className="flex items-center justify-between gap-6 px-6 py-2 bg-slate-900/80 backdrop-blur-md shadow-xl rounded-full max-w-4xl mx-auto">
              {/* Logo and Brand */}
              <Link href="/" className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 via-teal-400 to-purple-500">
                  <Brain className="w-6 h-6 text-white" />
                </span>
                <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 tracking-tight">
                  care.ai
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link href="/features" className="text-base font-medium text-blue-100 hover:text-white transition-colors">Features</Link>
                <Link href="/pricing" className="text-base font-medium text-blue-100 hover:text-white transition-colors">Pricing</Link>
                <Link href="/about" className="text-base font-medium text-blue-100 hover:text-white transition-colors">About</Link>
              </div>

              {/* CTA & Auth */}
              <div className="hidden md:flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                    <button className="px-4 py-2 text-sm font-semibold text-blue-500 bg-white rounded-lg shadow hover:bg-blue-50 transition-all">Sign in</button>
                  </SignInButton>
                  <SignUpButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow hover:from-blue-600 hover:to-teal-600 transition-all">Sign up</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-9 h-9",
                        userButtonBox: "hover:shadow-lg transition-shadow duration-300",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-blue-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </nav>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-slate-900/95 backdrop-blur-md px-4 pb-4 pt-2 shadow-lg rounded-3xl mt-2">
                <div className="flex flex-col gap-4">
                  <Link href="/features" className="text-base font-medium text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                  <Link href="/pricing" className="text-base font-medium text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                  <Link href="/about" className="text-base font-medium text-blue-100 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <div className="flex gap-2 mt-2">
                    <SignedOut>
                      <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                        <button className="flex-1 px-4 py-2 text-sm font-semibold text-blue-500 bg-white rounded-lg shadow hover:bg-blue-50 transition-all">Sign in</button>
                      </SignInButton>
                      <SignUpButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                        <button className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow hover:from-blue-600 hover:to-teal-600 transition-all">Sign up</button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8",
                            userButtonBox: "hover:shadow-lg transition-shadow duration-300",
                          },
                        }}
                        afterSignOutUrl="/"
                      />
                    </SignedIn>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
