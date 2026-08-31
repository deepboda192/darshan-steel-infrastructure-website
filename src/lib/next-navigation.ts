import { useLocation, useNavigate } from "@tanstack/react-router";

/** Current pathname, matching the original site's `usePathname()`. */
export function usePathname(): string {
  return useLocation({ select: (l) => l.pathname });
}

/** Read-only search params, matching the original site's `useSearchParams()`. */
export function useSearchParams(): URLSearchParams {
  const searchStr = useLocation({ select: (l) => l.searchStr });
  return new URLSearchParams(searchStr ?? "");
}

/** Minimal router shim with the navigation helpers the site uses. */
export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href: string) => navigate({ to: href }),
    replace: (href: string) => navigate({ to: href, replace: true }),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  };
}
