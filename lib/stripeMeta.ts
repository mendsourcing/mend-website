// Stripe metadata limits: 50 keys, 40-char keys, 500-char values.
// Long free-text (the "Anything else?" box) blew past 500 and Stripe
// rejected the whole checkout — the enrollee saw "Failed to create
// checkout session" and could not sign up.
export const STRIPE_META_VALUE_MAX = 500;

// Chunk below the hard cap so multi-byte punctuation (em-dashes, curly
// quotes) has headroom however Stripe counts it.
const CHUNK = 450;
const MAX_CHUNKS = 6; // 2,700 chars preserved; the forms cap input at 2,000

export type StripeMeta = Record<string, string>;

export function clampMeta(value: unknown): string {
  const s = value == null ? "" : String(value);
  const cps = Array.from(s);
  return cps.length > CHUNK ? cps.slice(0, CHUNK).join("") : s;
}

// Spread a long value across `key`, `key_2`, `key_3`… so nothing is lost.
export function putChunked(meta: StripeMeta, key: string, value: unknown): void {
  const cps = Array.from(value == null ? "" : String(value));
  meta[key] = cps.slice(0, CHUNK).join("");
  for (let i = 1; i < MAX_CHUNKS && i * CHUNK < cps.length; i++) {
    meta[`${key}_${i + 1}`] = cps.slice(i * CHUNK, (i + 1) * CHUNK).join("");
  }
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
