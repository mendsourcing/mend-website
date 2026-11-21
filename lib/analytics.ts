// Conversion events for GA4 (gtag) and PostHog. Call once per successful
// form submit. Both tags load from app/layout.tsx; gtag only when
// NEXT_PUBLIC_GA_ID is set, so every call is guarded for absence.
//
// GA4 event name `generate_lead` is a recommended event; it gets marked
// as a key event in the GA4 admin (property 481225128) so it counts as a
// conversion in reports and in the CRM acquisition panel.
type Gtag = (...args: unknown[]) => void;
type PostHog = { capture?: (event: string, props?: Record<string, unknown>) => void };

export type LeadForm =
  | "guide"
  | "newsletter"
  | "contact"
  | "govscraper"
  | "govtraining"
  | "govadmin"
  | "packaging-logistics"
  | "government-defense-contracting"
  | "federal";

export function trackLead(form: LeadForm | string, props: Record<string, string | number | boolean | undefined> = {}): void {
  const payload: Record<string, unknown> = { form };
  for (const [k, v] of Object.entries(props)) if (v !== undefined && v !== "") payload[k] = v;
  try {
    const w = window as unknown as { gtag?: Gtag };
    if (typeof w.gtag === "function") w.gtag("event", "generate_lead", payload);
  } catch { /* GA4 not loaded */ }
  try {
    const ph = (window as unknown as { posthog?: PostHog }).posthog;
    if (ph && typeof ph.capture === "function") ph.capture("generate_lead", payload);
  } catch { /* PostHog stub not ready */ }
}
