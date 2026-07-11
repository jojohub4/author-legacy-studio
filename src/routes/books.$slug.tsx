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
          inLanguage: "en",
          description: loaderData.synopsis,
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
  const book = Route.useLoaderData();
  const related = BOOKS.filter((b) => b.slug !== book.slug);

  return (
    <>
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

            <p className="mt-8 text-lg leading-relaxed text-cream/85">{book.longDescription}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {book.themes.map((t) => (
                <span key={t} className="text-[0.7rem] uppercase tracking-widest border border-gold/50 rounded-full px-3 py-1 text-gold-soft">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="eyebrow text-gold-soft">Available Formats</div>
                <p className="mt-2 text-cream/80">{book.formats.join(" · ")}</p>
              </div>
              <div>
                <div className="eyebrow text-gold-soft">ISBN</div>
                <p className="mt-2 text-cream/80 font-mono text-sm">{book.isbn}</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="eyebrow text-gold-soft mb-4">Where to Read</div>
              <div className="flex flex-wrap gap-3">
                {book.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
                     className="rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.22em] text-forest-deep font-medium hover:bg-gold-soft transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-cream/50">
                Only official retail and reading links are shown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-luxe py-24">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-display text-3xl md:text-4xl text-forest-deep">Also by Antony</h2>
            <Link to="/books" className="text-sm underline underline-offset-8 decoration-gold">All books →</Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((b) => (
              <Link key={b.slug} to="/books/$slug" params={{ slug: b.slug }}
                    className="group grid grid-cols-[auto_1fr] gap-6 items-start book-card hover:book-card-hover">
                <img src={b.cover} alt="" loading="lazy" width={800} height={1200} className="w-32 rounded-sm shadow-lift" />
                <div>
                  <div className="eyebrow">{b.year}</div>
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
