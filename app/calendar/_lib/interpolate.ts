// Kept out of `i18n.ts` because that module is `server-only` while the
// customer list runs on the client and still needs to fill copy templates.
export function interpolateCopy(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    Object.hasOwn(values, key) ? String(values[key]) : match,
  );
}
