// First-touch attribution captured by the layout script; attach to every
// form POST so the CRM can stamp the lead's origin.
export function getAttribution(): Record<string, string> | undefined {
  try {
    const raw = localStorage.getItem("mend_attr");
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}
