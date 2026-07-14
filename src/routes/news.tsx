import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Media — Antony Wainaina Kagucia" },
      { name: "description", content: "News, media mentions, and research publications featuring Antony Wainaina Kagucia." },
      { property: "og:title", content: "News & Media — Antony Wainaina Kagucia" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

const items = [
  {
    date: "February 5, 2026",
    kind: "New Release",
    title: "Confessions From the Cells — out now",
    body: "The new novel — a prison-chaplain's story of guilt, hearing, and hope — is available in digital editions.",
    url: "https://www.everand.com/book/993136128/Confessions-From-the-Cells",
    urlLabel: "Read on Everand",
  },
  {
    date: "September 5, 2025",
    kind: "New Release",
    title: "God's or Satan's — essays on choice and integrity",
    body: "Published as an ebook via Antony Kagucia; also listed on Angus & Robertson.",
    url: "https://www.angusrobertson.com.au/ebooks/gods-or-satans-antony-wainaina-kagucia/p/9798232696535",
    urlLabel: "View on Angus & Robertson",
  },
  {
    date: "August 11, 2025",
    kind: "Debut Novel",
    title: "Shadows Of Wealth — debut novel released",
    body: "A Kenyan family saga of inheritance and secrets from Nairobi to Gdańsk.",
    url: "https://www.everand.com/book/900707514/Shadows-Of-Wealth",
    urlLabel: "Read on Everand",
  },
  {
    date: "2020",
    kind: "Research",
    title: "Peer-reviewed publication in JARTS",
    body: 'Co-authored "Characterisation of productivity and diseases affecting dairy goats in smallholder systems of Greater Thika Region, Kenya" — Journal of Agriculture and Rural Development in the Tropics and Subtropics, Vol. 121, No. 2 (University of Kassel).',
    url: "https://doi.org/10.17170/kobra-202010191972",
    urlLabel: "View DOI",
  },
];

function NewsPage() {
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="max-w-3xl">
        <span className="eyebrow">News & Media</span>
        <h1 className="text-display text-5xl md:text-6xl mt-4 text-foreground">
          The record so far.
        </h1>
        <p className="mt-5 text-foreground/70 text-lg">
          Public releases, publications, and mentions. Interviews and podcasts
          will be added as they are recorded.
        </p>
      </div>

      <ol className="mt-16 space-y-10 border-l border-gold/40 pl-8 md:pl-12">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span aria-hidden className="absolute -left-[41px] md:-left-[57px] top-2 h-3 w-3 rounded-full bg-gold ring-4 ring-cream" />
            <div className="eyebrow">{it.date} · {it.kind}</div>
            <h2 className="text-display text-2xl md:text-3xl mt-2 text-foreground">{it.title}</h2>
            <p className="mt-3 text-foreground/75 leading-relaxed max-w-3xl">{it.body}</p>
            <a href={it.url} target="_blank" rel="noreferrer"
               className="mt-4 inline-block text-sm underline underline-offset-4 decoration-gold hover:text-foreground/70">
              {it.urlLabel} →
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
