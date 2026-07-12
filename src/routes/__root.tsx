import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { BirthdayModal } from "../components/site/BirthdayModal";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <div className="max-w-md text-center">
        <div className="eyebrow text-gold">404</div>
        <h1 className="text-display text-5xl mt-3 text-forest-deep">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The chapter you're looking for isn't here.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-forest-deep px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream hover:bg-forest transition-colors"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-3xl text-forest-deep">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-forest-deep px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-cream"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-forest-deep px-5 py-2.5 text-xs uppercase tracking-[0.22em]">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Antony Wainaina Kagucia — Kenyan Author & Veterinary Surgeon" },
      {
        name: "description",
        content:
          "Official site of Antony Wainaina Kagucia — Kenyan author of Shadows of Wealth, God's or Satan's, and Confessions From the Cells. Storyteller, veterinary surgeon, and voice from the Mount Kenya region.",
      },
      { name: "author", content: "Antony Wainaina Kagucia" },
      { property: "og:site_name", content: "Antony Wainaina Kagucia" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Antony Wainaina Kagucia — Kenyan Author & Veterinary Surgeon" },
      { property: "og:description", content: "Official site of Antony Wainaina Kagucia — Kenyan author of Shadows of Wealth, God's or Satan's, and Confessions From the Cells. Storyteller, veterinary surgeon, and voice from the Mount Kenya region." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Antony Wainaina Kagucia — Kenyan Author & Veterinary Surgeon" },
      { name: "twitter:description", content: "Official site of Antony Wainaina Kagucia — Kenyan author of Shadows of Wealth, God's or Satan's, and Confessions From the Cells. Storyteller, veterinary surgeon, and voice from the Mount Kenya region." },
      { name: "theme-color", content: "#1c3527" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0be9789b-6cb1-44e4-9c01-ec7c62ce87e4/id-preview-e749df05--efa01552-ab0e-48b6-955e-6fcd20d138ef.lovable.app-1783766201879.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0be9789b-6cb1-44e4-9c01-ec7c62ce87e4/id-preview-e749df05--efa01552-ab0e-48b6-955e-6fcd20d138ef.lovable.app-1783766201879.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Antony Wainaina Kagucia",
          jobTitle: ["Author", "Veterinary Surgeon"],
          nationality: "Kenyan",
          worksFor: {
            "@type": "GovernmentOrganization",
            name: "Ministry of Agriculture, Livestock and Fisheries — County Government of Kiambu, Kenya",
          },
          sameAs: [
            "https://www.everand.com/author/891112592/Antony-Wainaina-Kagucia",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [clicks, setClicks] = useState(0);
  const [birthday, setBirthday] = useState(false);

  const onLogo = () => {
    setClicks((c) => {
      const next = c + 1;
      if (next >= 5) {
        setBirthday(true);
        return 0;
      }
      return next;
    });
    setTimeout(() => setClicks(0), 2500);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header onLogoClick={onLogo} />
        <main id="main" className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
        <BirthdayModal open={birthday} onClose={() => setBirthday(false)} />
      </div>
    </QueryClientProvider>
  );
}

