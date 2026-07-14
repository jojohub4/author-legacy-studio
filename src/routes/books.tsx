import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BOOKS } from "@/lib/books";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — Antony Wainaina Kagucia" },
      { name: "description", content: "Explore all books by Antony Wainaina Kagucia: Shadows of Wealth, God's or Satan's, and Confessions From the Cells. Fiction and essays from a Kenyan storyteller." },
      { property: "og:title", content: "Books by Antony Wainaina Kagucia" },
      { property: "og:description", content: "Fiction and essays from a Kenyan author." },
      { property: "og:url", content: "/books" },
    ],
    links: [{ rel: "canonical", href: "/books" }],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");

  const genres = useMemo(() => ["All", ...new Set(BOOKS.map((b) => b.genre.split("·")[0].trim()))], []);
  const years = useMemo(() => ["All", ...new Set(BOOKS.map((b) => String(b.year)))], []);

  const filtered = BOOKS.filter((b) => {
    const matchesQ = !q || (b.title + b.synopsis + b.themes.join(" ")).toLowerCase().includes(q.toLowerCase());
    const matchesG = genre === "All" || b.genre.startsWith(genre);
    const matchesY = year === "All" || String(b.year) === year;
    return matchesQ && matchesG && matchesY;
  });

  return (
    <>
      <section className="container-luxe pt-16 pb-8">
        <div className="max-w-3xl">
          <span className="eyebrow">The Library</span>
          <h1 className="text-display text-5xl md:text-6xl mt-4 text-foreground">
            The Books.
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl">
            Three works. Distinct genres, one voice — attentive to legacy,
            faith, and the moral weight of ordinary choices.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 grid gap-4 md:grid-cols-[1fr_auto_auto] rounded-xl border border-border bg-card p-4">
          <input
            aria-label="Search books"
            placeholder="Search titles, themes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="rounded-md bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-gold"
          />
          <select aria-label="Filter by genre" value={genre} onChange={(e) => setGenre(e.target.value)}
                  className="rounded-md bg-transparent px-3 py-2.5 text-sm outline-none border border-border">
            {genres.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select aria-label="Filter by year" value={year} onChange={(e) => setYear(e.target.value)}
                  className="rounded-md bg-transparent px-3 py-2.5 text-sm outline-none border border-border">
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
      </section>

      <section className="container-luxe pb-24 md:pb-32">
        <div className="grid gap-16 md:gap-12 lg:grid-cols-3">
          {filtered.map((b) => (
            <article key={b.slug} className="book-card hover:book-card-hover group">
              <Link to="/books/$slug" params={{ slug: b.slug }} className="block">
                <div className="overflow-hidden rounded-sm shadow-lift">
                  <img src={b.cover} alt={`Cover of ${b.title}`} loading="lazy" width={800} height={1200}
                       className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pt-6">
                  <div className="eyebrow">{b.year} · {b.genre}</div>
                  <h2 className="text-display text-3xl mt-2 text-foreground group-hover:text-foreground/70 transition-colors">
                    {b.title}
                  </h2>
                  <p className="mt-3 text-foreground/70 line-clamp-4">{b.synopsis}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {b.themes.slice(0, 3).map((t) => (
                      <span key={t} className="text-[0.68rem] uppercase tracking-widest border border-border rounded-full px-3 py-1 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No books match your search.</p>
        )}
      </section>
    </>
  );
}
