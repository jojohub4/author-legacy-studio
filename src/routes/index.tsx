import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOKS, bookCount, featuredBook } from "@/lib/books";
import portrait from "@/assets/author-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const asWord = (n: number) => numberWords[n] ?? String(n);


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Antony Wainaina Kagucia — Kenyan Author & Veterinary Surgeon" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = featuredBook();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/85 via-forest-deep/70 to-cream" />

        <div className="container-luxe grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 fade-in-up text-cream">
            <div className="flex items-center gap-4">
              <span className="gold-rule" />
              <span className="eyebrow text-gold-soft">Official Author Site</span>
            </div>
            <h1 className="text-display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-cream">
              Antony Wainaina<br />
              <span className="italic text-gold-soft">Kagucia</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80 font-serif italic">
              Kenyan Author · Veterinary Surgeon · Storyteller
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-cream/75">
              Stories rooted in the red soil of the Mount Kenya region — of
              inheritance and betrayal, faith and doubt, the quiet weight of
              legacy. A veterinary surgeon by day; a chronicler of the human
              condition by lamplight.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-forest-deep hover:bg-gold-soft transition-all hover:-translate-y-0.5"
              >
                Explore the Books →
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-7 py-3.5 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cream/10 transition-colors"
              >
                Read About the Author
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 fade-in-up">
            <div className="relative mx-auto max-w-sm">
              <div aria-hidden className="absolute -inset-4 rounded-lg border border-gold/40" />
              <div aria-hidden className="absolute -inset-8 rounded-lg border border-gold/15" />
              <img
                src={portrait}
                alt="Portrait of Antony Wainaina Kagucia"
                width={1024}
                height={1280}
                className="relative rounded-lg shadow-luxe object-cover w-full"
              />
              <div className="absolute -bottom-6 -left-6 rounded-sm bg-cream px-5 py-3 shadow-lift">
                <div className="eyebrow text-forest">Est. 2025</div>
                <div className="text-display text-forest-deep">{asWord(bookCount())} Books · One Voice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative group">
              <img
                src={featured.cover}
                alt={`Cover of ${featured.title}`}
                loading="lazy"
                width={800}
                height={1200}
                className="w-full rounded-sm shadow-luxe transition-transform duration-700 group-hover:-translate-y-2"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="gold-rule" />
              <span className="eyebrow">The New Book · {featured.releaseDate}</span>
            </div>
            <h2 className="text-display mt-6 text-4xl md:text-5xl text-foreground">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-sm uppercase tracking-widest">
              {featured.genre}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80 font-serif italic">

              "{featured.synopsis}"
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {featured.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-forest-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream hover:bg-forest transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/books/$slug"
                params={{ slug: featured.slug }}
                className="rounded-full border border-forest-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-forest-deep hover:bg-forest-deep hover:text-cream transition-colors"
              >
                Full details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKS PREVIEW */}
      <section className="bg-forest-deep text-cream py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <div className="eyebrow text-gold-soft">The Library</div>
              <h2 className="text-display text-4xl md:text-5xl mt-3 text-cream">
                Every book, a doorway.
              </h2>
            </div>
            <Link to="/books" className="text-sm underline underline-offset-8 decoration-gold hover:text-gold">
              View all →
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {BOOKS.map((b) => (
              <Link
                key={b.slug}
                to="/books/$slug"
                params={{ slug: b.slug }}
                className="group book-card hover:book-card-hover block"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={b.cover}
                    alt={`Cover of ${b.title}`}
                    loading="lazy"
                    width={800}
                    height={1200}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-6">
                  <div className="eyebrow text-gold-soft">{b.year} · {b.genre.split("·")[0].trim()}</div>
                  <h3 className="text-display text-2xl mt-2 text-cream group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/70 line-clamp-3">{b.synopsis}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PULLQUOTE */}
      <section className="container-luxe py-24 md:py-32 text-center">
        <span className="gold-rule mx-auto block" />
        <blockquote className="mt-8 text-display text-3xl md:text-5xl text-forest-deep leading-tight max-w-4xl mx-auto">
          "Loyalty and betrayal walk hand in hand, and truth has a price
          only the brave are willing to pay."
        </blockquote>
        <p className="mt-8 eyebrow">— From Shadows Of Wealth</p>
      </section>
    </>
  );
}
