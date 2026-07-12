import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";


const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ onLogoClick }: { onLogoClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_88%,transparent)] border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">

        <button
          onClick={onLogoClick}
          aria-label="Antony Wainaina Kagucia — home"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
        >
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold font-serif text-lg group-hover:bg-gold/10 transition-colors"
          >
            AK
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-display text-lg text-forest-deep">
              Antony Wainaina Kagucia
            </span>
            <span className="eyebrow text-[0.6rem] tracking-[0.32em] opacity-70">
              Author · Veterinary Surgeon
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative text-sm tracking-wide text-forest-deep/85 hover:text-forest-deep transition-colors"
              activeProps={{ className: "text-forest-deep font-medium" }}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            to="/books"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-forest-deep/80 bg-forest-deep px-5 py-2 text-xs uppercase tracking-[0.22em] text-cream hover:bg-forest transition-colors"
          >
            The Books
          </Link>
        </nav>

        <button
          className="md:hidden text-forest-deep p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-4 h-px bg-current ml-auto" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-cream">
          <nav className="container-luxe py-6 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-forest-deep text-lg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
