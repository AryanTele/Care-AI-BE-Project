import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care AI - Your customer service representative",
  description: "AI-powered customer service representative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center p-4 border-b border-gray-200 ml-5">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png" // Make sure the logo file is in the public folder
                alt="Care AI Logo"
                width={40} // Adjust the width as needed
                height={40} // Adjust the height as needed
              />
              <span className="text-2xl font-bold text-blue-800">care.ai</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex gap-4">
              <SignedOut>
                <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
