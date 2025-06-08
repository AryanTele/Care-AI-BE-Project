import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full flex justify-center mt-38 relative">
      
      {/* Center: Nav Links */}
      <nav className="flex items-center gap-4 px-8 py-4 bg-slate-900/80 backdrop-blur-md shadow-2xl rounded-full max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="text-blue-200 text-lg font-semibold hover:text-white hover:bg-blue-500/10 focus:bg-blue-500/10 px-6 py-3 rounded-full">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" asChild className="text-blue-200 text-lg font-semibold hover:text-white hover:bg-blue-500/10 focus:bg-blue-500/10 px-6 py-3 rounded-full">
          <Link href="/dashboard/inbound">Inbound Calls</Link>
        </Button>
        <Button variant="ghost" asChild className="text-blue-200 text-lg font-semibold hover:text-white hover:bg-blue-500/10 focus:bg-blue-500/10 px-6 py-3 rounded-full">
          <Link href="/dashboard/outbound">Outbound Calls</Link>
        </Button>
      </nav>
    </header>
  );
}
