"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import {
  isAuthenticated,
  subscribeToAuthSession,
  writePendingRoute,
} from "@/lib/services/authSession";

type MarketingProtectedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function MarketingProtectedLink({
  href,
  className,
  children,
}: MarketingProtectedLinkProps) {
  const authenticated = useSyncExternalStore(
    subscribeToAuthSession,
    isAuthenticated,
    () => false,
  );

  const targetHref = authenticated ? href : "/login";

  const handleClick = () => {
    if (!authenticated) {
      writePendingRoute(href);
    }
  };

  return (
    <Link href={targetHref} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
