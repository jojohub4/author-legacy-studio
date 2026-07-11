import { useEffect } from "react";

export function BirthdayModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="birthday-title"
      className="fixed inset-0 z-[100] grid place-items-center bg-forest-deep/85 backdrop-blur-md fade-in-up p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl border border-gold/40 bg-cream p-10 text-center shadow-luxe"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold/60 text-gold">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />
          </svg>
        </div>
        <div className="eyebrow text-gold">A Small Note</div>
        <h2 id="birthday-title" className="text-display text-3xl mt-3 text-forest-deep">
          Happy Birthday, Baba
        </h2>
        <p className="mt-5 text-forest-deep/80 leading-relaxed">
          Built with love and admiration in celebration of{" "}
          <span className="font-medium">Antony Kagucia Wainaina's</span> birthday.
          Thank you for inspiring readers — and your family — alike.
        </p>
        <p className="mt-4 font-serif italic text-forest-deep/70">
          — With every good wish, from your son.
        </p>
        <button
          onClick={onClose}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream hover:bg-forest transition-colors"
        >
          With gratitude
        </button>
      </div>
    </div>
  );
}
