import {
  Outlet,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import rethinkLatin from "@fontsource-variable/rethink-sans/files/rethink-sans-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { company } from "@/data/company";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/site/Button";
import { usePathname } from "@/lib/next-navigation";

import { organizationSchema } from "@/lib/schema";
import { NotFoundPage } from "@/components/site/NotFoundPage";

/**
 * Runs before paint: marks that JS is available (which arms the scroll-driven
 * motion CSS) and enables placeholder audit mode when ?audit=1 is present.
 */
const BOOT_SCRIPT = `
document.documentElement.classList.add('js');
try{if(new URLSearchParams(location.search).has('audit')){document.documentElement.setAttribute('data-audit','on')}}catch(e){}
`.trim();

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <h1 className="m-h3">This page didn&apos;t load</h1>
        <p className="m-paragraph medium mt-3">
          Something went wrong on our end. Try again or head back to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            arrow={false}
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button href="/" variant="outline" arrow={false}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${company.name} | PEB & Structural Steel Solutions` },
      {
        name: "description",
        content:
          "Darshan Steel Infrastructure provides engineered Pre-Engineered Buildings, industrial sheds, warehouses, factories, cold storage and structural steel solutions.",
      },
      { name: "application-name", content: company.name },
      { name: "author", content: company.name },
      { name: "theme-color", content: "#141414" },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      // The two site faces are self-hosted (see styles.css); preloading the latin
      // files lets text render in the right face from the first paint.
      { rel: "preload", as: "font", type: "font/woff2", href: rethinkLatin, crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: interLatin, crossOrigin: "anonymous" },
    ],
    scripts: [
      { children: BOOT_SCRIPT },
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = usePathname();

  // The admin and sign-in screens are tools, not pages of the site: they get
  // the shell without the marketing navigation and footer.
  const bare = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  return (
    <>
      {!bare && <Navbar />}
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main id="main">
        <Outlet />
      </main>
      {!bare && <Footer />}
    </>
  );
}
