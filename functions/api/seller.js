import { escapeHtml, guardFormRequest, jsonResponse } from '../_utils.js';
import { sendNotification, upsertCrmContact } from '../_delivery.js';

export async function onRequestPost(context) {
  try {
    const guard = await guardFormRequest(context);
    if (!guard.ok) return guard.response;

    const { address, email } = guard.body;

    if (!address?.trim() || !email?.trim()) {
      return jsonResponse({ error: 'Address and email are required' }, 400);
    }

    await upsertCrmContact(context.env, {
      email,
      address,
      source: 'OVLP Website — Property Review',
      tags: ['seller-property-review'],
    });
    await sendNotification(context.env, {
      subject: 'New Seller Lead — Property Review Request',
      replyTo: email,
      html: `
        <h2>New Seller Lead</h2>
        <p><strong>Property Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> Not collected on this form. Phone/SMS opt-in is handled by the GHL chat widget.</p>
        <p><strong>Source:</strong> Homepage — Property Review form</p>
      `,
    });

    return jsonResponse({ success: true }, 201);
  } catch (err) {
    console.error('Seller form error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
