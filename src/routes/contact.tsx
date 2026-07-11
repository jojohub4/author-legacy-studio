import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Antony Wainaina Kagucia" },
      { name: "description", content: "Contact Antony Wainaina Kagucia for interviews, speaking engagements, and reader correspondence." },
      { property: "og:title", content: "Contact Antony Wainaina Kagucia" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Get in Touch</span>
          <h1 className="text-display text-5xl md:text-6xl mt-4 text-forest-deep">
            Write to the author.
          </h1>
          <p className="mt-5 text-ink/70 text-lg max-w-md">
            For reader letters, interviews, speaking engagements, or media
            enquiries — leave a note. Every message is read.
          </p>

          <div className="mt-12 space-y-4 text-sm text-ink/70">
            <div>
              <div className="eyebrow">Location</div>
              <p className="mt-1">Kiambu County, Kenya</p>
            </div>
            <div>
              <div className="eyebrow">Read Elsewhere</div>
              <p className="mt-1">
                <a href="https://www.everand.com/author/891112592/Antony-Wainaina-Kagucia" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gold hover:text-forest">
                  Everand author page
                </a>
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-lift"
          aria-label="Contact form"
        >
          {sent ? (
            <div className="py-16 text-center">
              <div className="eyebrow text-gold">Message received</div>
              <h2 className="text-display text-3xl mt-3 text-forest-deep">Thank you.</h2>
              <p className="mt-4 text-ink/70">Your note will be read personally.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5">
                <label className="block">
                  <span className="eyebrow">Name</span>
                  <input required className="mt-2 w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold" />
                </label>
                <label className="block">
                  <span className="eyebrow">Email</span>
                  <input required type="email" className="mt-2 w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold" />
                </label>
                <label className="block">
                  <span className="eyebrow">Subject</span>
                  <select className="mt-2 w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold">
                    <option>Reader letter</option>
                    <option>Interview request</option>
                    <option>Speaking engagement</option>
                    <option>Media enquiry</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow">Message</span>
                  <textarea required rows={6} className="mt-2 w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold resize-none" />
                </label>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-forest-deep px-6 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-forest transition-colors"
              >
                Send Message
              </button>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                This form is a demonstration. Wire it to your preferred email provider to receive live messages.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
