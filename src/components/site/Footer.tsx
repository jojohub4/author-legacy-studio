import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-forest-deep text-cream/85">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="eyebrow text-gold-soft">The Official Home Of</div>
          <h3 className="text-display text-3xl mt-3 text-cream">
            Antony Wainaina Kagucia
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
            Kenyan author and veterinary surgeon. Stories from the Mount Kenya
            region on power, faith, redemption, and the untold weight of legacy.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-md gap-2"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-cream/20 bg-transparent px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-forest-deep font-medium hover:bg-gold-soft transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <div className="eyebrow text-gold-soft">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/books" className="hover:text-gold">Books</Link></li>
            <li><Link to="/news" className="hover:text-gold">News & Media</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-gold-soft">Read Elsewhere</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://www.everand.com/author/891112592/Antony-Wainaina-Kagucia" target="_blank" rel="noreferrer" className="hover:text-gold">
                Everand author page
              </a>
            </li>
            <li>
              <a href="https://www.angusrobertson.com.au/ebooks/gods-or-satans-antony-wainaina-kagucia/p/9798232696535" target="_blank" rel="noreferrer" className="hover:text-gold">
                Angus & Robertson
              </a>
            </li>
            <li>
              <a href="https://doi.org/10.17170/kobra-202010191972" target="_blank" rel="noreferrer" className="hover:text-gold">
                JARTS Journal (2020)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe flex flex-col items-start justify-between gap-3 py-6 text-xs text-cream/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Antony Wainaina Kagucia. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Built with quiet devotion.</p>
        </div>
      </div>
    </footer>
  );
}
