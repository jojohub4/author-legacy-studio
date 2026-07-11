import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/author-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Antony Wainaina Kagucia" },
      { name: "description", content: "Biography of Antony Wainaina Kagucia: Kenyan author and veterinary surgeon serving the County Government of Kiambu, drawing on the Mount Kenya region for his fiction and essays." },
      { property: "og:title", content: "About Antony Wainaina Kagucia" },
      { property: "og:description", content: "Kenyan author and veterinary surgeon." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const milestones = [
  { year: "Kiambu, Kenya", label: "Veterinary Practice", body: "Serves as a veterinary surgeon with the Ministry of Agriculture, Livestock and Fisheries — County Government of Kiambu." },
  { year: "2020", label: "Peer-Reviewed Research", body: "Co-authored a study on dairy-goat productivity and diseases in smallholder systems of the Greater Thika region (JARTS, Vol. 121, No. 2)." },
  { year: "August 2025", label: "Shadows Of Wealth", body: "Debut novel published — a Kenyan family saga of inheritance, secrets, and international intrigue." },
  { year: "September 2025", label: "God's or Satan's", body: "A book of essays on integrity, choice, and modern spirituality." },
  { year: "February 2026", label: "Confessions From the Cells", body: "New Christian fiction on chaplaincy, guilt, and redemption behind prison bars." },
];

function AboutPage() {
  return (
    <>
      <section className="container-luxe py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 border border-gold/40 rounded-sm" />
              <img src={portrait} alt="Antony Wainaina Kagucia" loading="lazy" width={1024} height={1280}
                   className="relative w-full rounded-sm shadow-luxe object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="eyebrow">About the Author</span>
            <h1 className="text-display text-5xl md:text-6xl mt-4 text-forest-deep">
              A veterinarian who writes at lamplight.
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
              <p>
                <span className="font-medium text-forest-deep">Antony Wainaina Kagucia</span> is a
                Kenyan author, veterinary surgeon, and storyteller. He is employed by the
                Government of Kenya, serving with the Ministry of Agriculture, Livestock
                and Fisheries in the County Government of Kiambu.
              </p>
              <p>
                Having worked extensively across the Mount Kenya region in both the public
                and private sectors, he brings to his fiction an intimate understanding of
                community dynamics, generational legacy, and the hidden complexities of
                human ambition.
              </p>
              <p>
                His writing is marked by vivid settings, rich character development, and
                narratives that weave together family drama, mystery, and the far-reaching
                consequences of power. Alongside fiction, he writes essays that engage
                spirituality, philosophy, and the daily ethics of ordinary life.
              </p>
              <p>
                When he is not writing, Antony is passionate about mentoring young
                professionals, preserving Kenya's literary heritage, and exploring the
                intersections of culture, morality, and modern African identity. He lives
                with his family, drawing inspiration from both the landscapes and the
                human stories that surround him.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-forest-deep text-cream py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow text-gold-soft">Milestones</span>
            <h2 className="text-display text-4xl md:text-5xl mt-4 text-cream">
              A career of two callings.
            </h2>
            <p className="mt-4 text-cream/70">Veterinary practice, research, and the writing life.</p>
          </div>

          <ol className="relative mt-16 border-l border-gold/40 ml-4 md:ml-0 md:mx-auto md:max-w-3xl md:pl-12">
            {milestones.map((m, i) => (
              <li key={i} className="pl-8 md:pl-0 pb-12 relative">
                <span aria-hidden className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gold ring-4 ring-forest-deep" />
                <div className="eyebrow text-gold-soft">{m.year}</div>
                <h3 className="text-display text-2xl mt-1 text-cream">{m.label}</h3>
                <p className="mt-2 text-cream/70 leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-luxe py-24 text-center">
        <span className="gold-rule mx-auto block" />
        <p className="mt-8 text-display italic text-3xl md:text-4xl text-forest-deep max-w-3xl mx-auto leading-tight">
          "To care for animals is to listen to what cannot be spoken.
          Fiction, I have found, asks the same of us."
        </p>
      </section>
    </>
  );
}
