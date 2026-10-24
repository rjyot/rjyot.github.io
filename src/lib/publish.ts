/** True only in `next dev`. Production builds inline this as false. */
export const isDev = process.env.NODE_ENV === "development";

/**
 * Copy that is allowed on the production site.
 * In dev, the string is unchanged. In production, TODO(Ryan) and PLACEHOLDER
 * sentences are removed, and an empty result means "do not render".
 */
export function published(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (isDev) return trimmed;

  const cleaned = trimmed
    .replace(/TODO\(Ryan\)[^.]*(?:\.|$)/g, "")
    .replace(/PLACEHOLDER:[^.]*(?:\.|$)/gi, "")
    .replace(/\bPLACEHOLDER\b/gi, "")
    .replace(/(?:\s*[·|]\s*)+$/g, "")
    .replace(/\s+[·|]\s+(?=[.])/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .trim();

  if (!cleaned || /^[.\s·|]*$/.test(cleaned)) return null;
  return cleaned;
}
