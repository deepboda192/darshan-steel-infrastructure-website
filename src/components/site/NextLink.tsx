import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean | null;
  scroll?: boolean;
  replace?: boolean;
};

const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:|\/\/)/.test(href) || href.startsWith("#");

/**
 * Drop-in replacement for the framework `Link` used by the original site.
 * Internal paths route through TanStack Router; everything else is a plain
 * anchor (external sites, mail, phone, hash targets).
 */
export default function Link({ href, prefetch: _p, scroll: _s, replace, ...rest }: Props) {
  if (isExternal(href)) {
    return <a href={href} {...rest} />;
  }

  const [pathname, hash] = href.split("#");

  return (
    <RouterLink
      to={pathname || "/"}
      hash={hash}
      replace={replace}
      {...(rest as Record<string, unknown>)}
    />
  );
}
