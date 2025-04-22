"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">CiteMe</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/app"
              className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              App
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
} 