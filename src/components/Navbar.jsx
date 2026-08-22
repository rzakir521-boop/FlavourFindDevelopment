import Link from "next/link";
import Logo from "./Logo";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="sm" />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/find"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-all hover:bg-[#FFA500] hover:text-white hover:shadow-lg hover:shadow-orange-500/30"
          >
            <Sparkles className="h-4 w-4" />
            Find Food
          </Link>
        </nav>
      </div>
    </header>
  );
}
