import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BOOKS, getBook } from "@/lib/books";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return book;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Book — Antony Wainaina Kagucia" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.title} — Antony Wainaina Kagucia` },
        { name: "description", content: loaderData.synopsis },
        { property: "og:title", content: `${loaderData.title} by Antony Wainaina Kagucia` },
        { property: "og:description", content: loaderData.synopsis },
        { property: "og:type", content: "book" },
        { property: "og:image", content: loaderData.cover },
        { property: "og:url", content: `/books/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.cover },
      ],
      links: [{ rel: "canonical", href: `/books/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: loaderData.title,
          author: { "@type": "Person", name: "Antony Wainaina Kagucia" },
          isbn: loaderData.isbn,
          bookFormat: "https://schema.org/EBook",
          datePublished: loaderData.releaseDate,
          numberOfPages: loaderData.pages,
          publisher: { "@type": "Organization", name: loaderData.publisher },
          inLanguage: loaderData.language,
          genre: loaderData.genre,
          description: loaderData.synopsis,
          image: loaderData.cover,
        }),
      }],
    };
  },
  component: BookDetail,
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="text-display text-4xl text-forest-deep">Book not found</h1>
      <Link to="/books" className="mt-6 inline-block underline underline-offset-8 decoration-gold">Back to books</Link>
    </div>
  ),
});

function BookDetail() {
  const book = Route.useLoaderData() as (typeof BOOKS)[number];
  const related = BOOKS.filter((b) => b.slug !== book.slug);

  return (
    <>
      {/* HERO — cover + metadata */}
      <section className="bg-forest-deep text-cream">
        <div className="container-luxe grid gap-14 py-20 md:py-28 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rounded-sm border border-gold/40" />
              <img src={book.cover} alt={`Cover of ${book.title}`} width={800} height={1200}
                   className="relative w-full rounded-sm shadow-luxe" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow text-gold-soft">{book.genre}</div>
            <h1 className="text-display text-5xl md:text-6xl mt-3 text-cream">{book.title}</h1>
            <p className="mt-3 text-cream/60 uppercase tracking-widest text-xs">
              {book.releaseDate} · {book.pages} pages · {book.readingTime}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-cream/85 font-serif italic">
              "{book.synopsis}"
            </p>
          </div>
        </div>
      </section>

      {/* SYNOPSIS */}
      <section className="container-luxe py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <span className="eyebrow">The Story</span>
          <h2 className="text-display text-4xl md:text-5xl mt-3 text-forest-deep">Synopsis</h2>
          <span aria-hidden className="gold-rule mt-6 block" />
          <p className="mt-8 text-lg leading-relaxed text-ink/85">{book.longDescription}</p>
        </div>
      </section>

      {/* FROM THE AUTHOR */}
      <section className="bg-cream/60 border-y border-gold/20 py-20 md:py-24">
        <div className="container-luxe max-w-3xl">
          <span className="eyebrow text-center block">A Word</span>
          <h2 className="text-display text-4xl md:text-5xl mt-3 text-forest-deep text-center">From the Author</h2>
          <figure className="mt-12 relative rounded-sm border border-gold/40 bg-background/70 p-10 md:p-14 shadow-lift">
            <span aria-hidden className="absolute -top-5 left-8 text-6xl text-gold font-serif leading-none">"</span>
            <blockquote className="text-display italic text-2xl md:text-3xl text-forest-deep leading-snug">
              {book.authorNote}
            </blockquote>
            <figcaption className="mt-8 eyebrow text-forest">— Antony Wainaina Kagucia</figcaption>
          </figure>
        </div>
      </section>

      {/* THEMES */}
      <section className="container-luxe py-20 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Explored Within</span>
          <h2 className="text-display text-4xl md:text-5xl mt-3 text-forest-deep">Book Themes</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {book.themes.map((t) => (
            <span
              key={t}
              className="text-xs uppercase tracking-[0.22em] rounded-full border border-gold/50 bg-background px-5 py-2.5 text-forest-deep hover:bg-gold hover:text-forest-deep transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* WHO SHOULD READ + BOOK INFO */}
      <section className="container-luxe pb-20 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Who should read */}
          <div className="rounded-sm border border-gold/30 bg-forest-deep text-cream p-8 md:p-10 shadow-lift">
            <span className="eyebrow text-gold-soft">For the Reader</span>
            <h3 className="text-display text-3xl mt-3 text-cream">Who Should Read This Book?</h3>
            <p className="mt-4 text-cream/75">Perfect for readers who enjoy:</p>
            <ul className="mt-5 space-y-3">
              {book.whoShouldRead.map((r) => (
                <li key={r} className="flex gap-3 items-start text-cream/90">
                  <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book information */}
          <div className="rounded-sm border border-border bg-card p-8 md:p-10 shadow-lift">
            <span className="eyebrow">The Details</span>
            <h3 className="text-display text-3xl mt-3 text-forest-deep">Book Information</h3>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <InfoRow label="Genre" value={book.genre} />
              <InfoRow label="Published" value={String(book.year)} />
              <InfoRow label="Language" value={book.language} />
              <InfoRow label="Pages" value={String(book.pages)} />
              <InfoRow label="Reading Time" value={book.readingTime} />
              <InfoRow label="Publisher" value={book.publisher} />
              <InfoRow label="Formats" value={book.formats.join(" · ")} />
              <InfoRow label="ISBN" value={book.isbn} mono />
            </dl>
          </div>
        </div>
      </section>

      {/* WHERE TO READ / BUY */}
      <section className="bg-forest-deep text-cream py-20 md:py-24">
        <div className="container-luxe max-w-4xl text-center">
          <span className="eyebrow text-gold-soft">Available Now</span>
          <h2 className="text-display text-4xl md:text-5xl mt-3 text-cream">Where to Read</h2>
          <p className="mt-4 text-cream/70">Only official retail and reading links are shown.</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {book.links.map((l, i) => {
              const primary = i === 0;
              return (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    "group inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs uppercase tracking-[0.22em] font-medium transition-all hover:-translate-y-0.5 " +
                    (primary
                      ? "bg-gold text-forest-deep hover:bg-gold-soft shadow-lift"
                      : "border border-cream/40 text-cream hover:bg-cream/10")
                  }
                >
                  {l.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO ENJOY */}
      {related.length > 0 && (
        <section className="container-luxe py-24">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="eyebrow">More to Read</span>
              <h2 className="text-display text-3xl md:text-4xl mt-3 text-forest-deep">You May Also Enjoy</h2>
            </div>
            <Link to="/books" className="text-sm underline underline-offset-8 decoration-gold">All books →</Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((b) => (
              <Link key={b.slug} to="/books/$slug" params={{ slug: b.slug }}
                    className="group grid grid-cols-[auto_1fr] gap-6 items-start book-card hover:book-card-hover">
                <img src={b.cover} alt="" loading="lazy" width={800} height={1200}
                     className="w-32 rounded-sm shadow-lift transition-transform duration-500 group-hover:-translate-y-1" />
                <div>
                  <div className="eyebrow">{b.year} · {b.genre.split("·")[0].trim()}</div>
                  <h3 className="text-display text-2xl mt-1 text-forest-deep group-hover:text-forest">{b.title}</h3>
                  <p className="mt-2 text-sm text-ink/70 line-clamp-3">{b.synopsis}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="eyebrow text-muted-foreground">{label}</dt>
      <dd className={"mt-1 text-forest-deep " + (mono ? "font-mono text-xs break-all" : "")}>{value}</dd>
    </div>
  );
}
