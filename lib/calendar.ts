// Generate .ics calendar invite string

export function generateICS(options: {
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM (PST)
  durationMinutes: number;
  location?: string;
  zoomLink?: string;
  organizerEmail?: string;
}): string {
  const { title, description, startDate, startTime, durationMinutes, location, zoomLink, organizerEmail } = options;

  // Parse PST time
  const [year, month, day] = startDate.split("-").map(Number);
  const [hour, minute] = startTime.split(":").map(Number);

  // Format as iCal datetime (local time with timezone)
  const pad = (n: number) => String(n).padStart(2, "0");
  const dtStart = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;

  // Calculate end time
  const endMinutes = hour * 60 + minute + durationMinutes;
  const endH = Math.floor(endMinutes / 60) % 24;
  const endM = endMinutes % 60;
  const dtEnd = `${year}${pad(month)}${pad(day)}T${pad(endH)}${pad(endM)}00`;

  // Build description with Zoom link
  let desc = description.replace(/\n/g, "\\n");
  if (zoomLink) {
    desc += `\\n\\nZoom Link: ${zoomLink}`;
  }

  const loc = zoomLink ? `Zoom: ${zoomLink}` : (location || "Virtual (Zoom)");

  const uid = `govtraining-${Date.now()}-${Math.random().toString(36).slice(2)}@mendsourcing.com`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MeND Sourcing Solutions//GovTraining//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VTIMEZONE",
    "TZID:America/Los_Angeles",
    "BEGIN:STANDARD",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZOFFSETFROM:-0700",
    "TZOFFSETTO:-0800",
    "TZNAME:PST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZOFFSETFROM:-0800",
    "TZOFFSETTO:-0700",
    "TZNAME:PDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;TZID=America/Los_Angeles:${dtStart}`,
    `DTEND;TZID=America/Los_Angeles:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    organizerEmail ? `ORGANIZER;CN=MeND Sourcing:mailto:${organizerEmail}` : "",
    // Reminder: 24 hours before
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${title} is tomorrow`,
    "END:VALARM",
    // Reminder: 1 hour before
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${title} starts in 1 hour`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");
}

// Convert PST time to EST display string
export function pstToEst(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const estH = (h + 3) % 24;
  const fmt = (hr: number) => `${hr > 12 ? hr - 12 : hr || 12}:${String(m).padStart(2, "0")} ${hr >= 12 ? "PM" : "AM"}`;
  return fmt(estH);
}

export function formatTimePST(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const fmt = (hr: number) => `${hr > 12 ? hr - 12 : hr || 12}:${String(m).padStart(2, "0")} ${hr >= 12 ? "PM" : "AM"}`;
  return fmt(h);
}
