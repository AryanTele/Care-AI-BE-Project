"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

export default function AuthStatus({ session }: { session: Session | null }) {
  const { data: clientSession } = useSession();
  const user = session?.user || clientSession?.user;

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span>Signed in as {user.email}</span>
        <Button onClick={() => signOut()} variant="outline">
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="space-x-4">
      <Link href="/login" className="text-gray-600 hover:text-blue-600">
        Login
      </Link>
      <Link href="/signup" className="text-gray-600 hover:text-blue-600">
        Sign up
      </Link>
    </div>
  );
}
