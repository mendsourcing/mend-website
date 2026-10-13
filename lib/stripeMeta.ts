// Stripe metadata limits: 50 keys, 40-char keys, 500-char values.
// Long free-text (the "Anything else?" box) blew past 500 and Stripe
// rejected the whole checkout — the enrollee saw "Failed to create
// checkout session" and could not sign up.
export const STRIPE_META_VALUE_MAX = 500;

// Hard cap on the free-text message box, enforced in the forms
// (maxLength) and again in the checkout routes (400).
export const MESSAGE_MAX = 2000;

// Stripe documents the cap as "500 characters" without saying whether
// that means code points, UTF-16 units or bytes. Budgeting by UTF-8
// bytes is the strictest of the three, so a chunk is safe under any
// counting rule. Chunks never split a code point.
const CHUNK_BYTES = 450;
const DEFAULT_MAX_CHUNKS = 6;

const utf8 = new TextEncoder();

export type StripeMeta = Record<string, string>;

function splitByBytes(value: unknown, maxChunks: number): string[] {
  const chunks: string[] = [];
  let current = "";
  let bytes = 0;
  for (const cp of Array.from(value == null ? "" : String(value))) {
    const len = utf8.encode(cp).length;
    if (bytes + len > CHUNK_BYTES) {
      chunks.push(current);
      if (chunks.length >= maxChunks) return chunks;
      current = "";
      bytes = 0;
    }
    current += cp;
    bytes += len;
  }
  chunks.push(current);
  return chunks;
}

export function clampMeta(value: unknown): string {
  return splitByBytes(value, 1)[0];
}

// Spread a long value across `key`, `key_2`, `key_3`… so nothing is lost.
export function putChunked(
  meta: StripeMeta,
  key: string,
  value: unknown,
  maxChunks: number = DEFAULT_MAX_CHUNKS,
): void {
  const chunks = splitByBytes(value, maxChunks);
  meta[key] = chunks[0];
  for (let i = 1; i < chunks.length; i++) meta[`${key}_${i + 1}`] = chunks[i];
}

export function readChunked(
  meta: Record<string, string | undefined> | null | undefined,
  key: string,
): string {
  if (!meta) return "";
  let out = meta[key] || "";
  for (let i = 2; meta[`${key}_${i}`]; i++) out += meta[`${key}_${i}`];
  return out;
}

// Customer-typed text goes into Resend HTML bodies; neutralise markup.
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
