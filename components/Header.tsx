import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex space-x-4">
          <li>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/inbound">Inbound Calls</Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/outbound">Outbound Calls</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
