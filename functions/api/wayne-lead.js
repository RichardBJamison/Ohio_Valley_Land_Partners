import {
  escapeHtml,
  hmacSha256Hex,
  jsonResponse,
  normalizePhone,
  timingSafeEqualHex,
} from '../_utils.js';
import { sendNotification, upsertCrmContact } from '../_delivery.js';

const NOTIFICATION_FALLBACK_REPLY = 'info@ohiovalleylandpartners.com';

function toolMessage(text, status = 200) {
  return new Response(text, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function parseArgs(envelope) {
  const raw = envelope?.arguments;
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {
      return {};
    }
  }
  return {};
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const secret = env.TAVUS_TOOL_SECRET;
    if (!secret) {
      return jsonResponse({ error: 'Tool delivery is not configured' }, 503);
    }

    const raw = await request.text();
    const received = String(request.headers.get('X-Tavus-Signature') || '')
      .replace(/^sha256=/i, '')
      .trim();
    const expected = await hmacSha256Hex(secret, raw);
    if (!timingSafeEqualHex(received, expected)) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    let envelope;
    try {
      envelope = JSON.parse(raw);
    } catch {
      return jsonResponse({ error: 'Invalid request' }, 400);
    }

    const args = parseArgs(envelope);
    const fullName = String(args.full_name || args.name || '').trim();
    const email = String(args.email || '').trim();
    const phone = normalizePhone(args.phone);
    const address = String(args.property_address || args.address || '').trim();
    const notes = String(args.notes || '').trim();
    const consent = args.consent;

    if (consent === false) {
      return toolMessage(
        'They did not agree to be contacted, so the review was not submitted. Offer the form on the page or (614) 653-7430 if they change their mind.',
      );
    }

    if (!address || (!phone && !email)) {
      return toolMessage(
        'I still need a property address and a phone number or email so a local buyer can follow up. Ask for those, then submit again.',
      );
    }

    await sendNotification(env, {
      subject: `Wayne Avatar Lead — ${String(fullName || address).slice(0, 80)}`,
      replyTo: email || NOTIFICATION_FALLBACK_REPLY,
      html: `
        <h2>New Seller Lead from Wayne</h2>
        ${fullName ? `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>` : ''}
        <p><strong>Property Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'Not provided'}</p>
        <p><strong>Email:</strong> ${email ? escapeHtml(email) : 'Not provided'}</p>
        ${notes ? `<p><strong>Notes:</strong><br/>${escapeHtml(notes)}</p>` : ''}
        <p><strong>Source:</strong> Wayne AI avatar — submit_property_review</p>
        <p><strong>Conversation:</strong> ${escapeHtml(envelope.conversation_id || '')}</p>
      `,
    });

    if (email) {
      try {
        await upsertCrmContact(env, {
          name: fullName,
          email,
          phone: phone || undefined,
          address,
          source: 'OVLP Website — Wayne Avatar',
          tags: ['seller-property-review', 'wayne-avatar'],
        });
      } catch (crmError) {
        console.error('Wayne lead CRM update failed after notification:', crmError);
      }
    }

    return toolMessage(
      'Property review received. Thank them. A local buyer will follow up. Offer (614) 653-7430 if they would rather call.',
    );
  } catch (err) {
    console.error('Wayne lead error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
