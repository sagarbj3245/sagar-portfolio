"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-foreground">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-accent-strong"
          >
            Say Hello
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-muted md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-6 py-3 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent px-4 py-2 text-center text-sm font-medium text-background"
          >
            Say Hello
          </a>
        </nav>
      )}
    </header>
  );
}
