export const protectedRoutePrefixes = [
  "/laplaso",
  "/vanhan",
  "/thuvien",
  "/hoso",
  "/views",
] as const;

export function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return normalized || "/";
}

export function isProtectedRoute(
  pathname: string,
  protectedPrefixes: readonly string[] = protectedRoutePrefixes,
) {
  const normalized = normalizePathname(pathname);

  return protectedPrefixes.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

export function getProtectedRoutePrefixes() {
  return [...protectedRoutePrefixes];
}
