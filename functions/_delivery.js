// GHL was cancelled (2026-11). Every OVLP form notification now goes to the shared
// owner lead router (comms-lead-router Worker), which stores the lead, texts Richard
// (Textbelt) and emails rbjpholdings@gmail.com (Migadu). Same exports as before so
// the form handlers are unchanged.
const CENTRAL_PRIORITY_ENDPOINT = 'https://opensourcebarware.com/api/priority-lead';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function plainText(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>|<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

export async function sendNotification(env, options) {
  const text = plainText(options.html || '');
  const replyTo = String(options.replyTo || '').trim();
  const phone = (text.match(/Phone:\s*([+()\d][\d\s().+-]{8,})/) || [])[1] || '';
  const files = (options.attachments || []).map((file) => file.filename).filter(Boolean);
  const response = await fetch(CENTRAL_PRIORITY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      brand: 'ohio-valley-land-partners',
      name: String(options.subject || 'OVLP website submission').slice(0, 160),
      ...(EMAIL.test(replyTo) ? { email: replyTo } : {}),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      message: text + (files.length ? `\nAttachment(s): ${files.join(', ')}` : ''),
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || `Lead router delivery failed (${response.status})`);
  }
  return payload;
}

// No CRM after GHL; the lead router keeps the durable record.
export async function upsertCrmContact() {
  return { contact: { id: null } };
}
