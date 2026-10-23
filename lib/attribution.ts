// First-touch attribution captured by the layout script; attach to every
// form POST so the CRM can stamp the lead's origin.
export function getAttribution(): Record<string, string> | undefined {
  try {
    const raw = localStorage.getItem("mend_attr");
    const a: Record<string, string> = raw ? JSON.parse(raw) : {};
    // The browser's anonymous PostHog id: lets the CRM alias this browser
    // to the person once the form reveals their email.
    try {
      const ph = (window as unknown as { posthog?: { get_distinct_id?: () => string } }).posthog;
      const id = ph?.get_distinct_id?.();
      if (id) a.ph_id = String(id).slice(0, 80);
    } catch { /* stub not ready */ }
    return Object.keys(a).length ? a : undefined;
  } catch {
    return undefined;
  }
}
