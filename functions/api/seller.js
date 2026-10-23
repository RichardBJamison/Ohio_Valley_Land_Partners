import { escapeHtml, guardFormRequest, jsonResponse } from '../_utils.js';
import { sendNotification, upsertCrmContact } from '../_delivery.js';

export async function onRequestPost(context) {
  try {
    const guard = await guardFormRequest(context);
    if (!guard.ok) return guard.response;

    const { address, email, phone, stage, fullName, parcelNumber, notes, source } = guard.body;
    const isFollowUp = stage === 'follow-up';
    const fromWayne = source === 'wayne';
    const phoneDigits = String(phone || '').replace(/\D/g, '');

    if (!address?.trim() || !email?.trim() || phoneDigits.length < 10) {
      return jsonResponse({ error: 'Address, phone, and email are required' }, 400);
    }

    if (isFollowUp && !fullName?.trim()) {
      return jsonResponse({ error: 'Name is required for the follow-up' }, 400);
    }

    await sendNotification(context.env, {
      subject: isFollowUp
        ? `Seller Lead Details — ${String(fullName).slice(0, 80)}`
        : 'New Seller Lead — Property Review Request',
      replyTo: email,
      html: `
        <h2>${isFollowUp ? 'Seller Lead Details' : 'New Seller Lead'}</h2>
        <p><strong>Property Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${fullName ? `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>` : ''}
        ${parcelNumber ? `<p><strong>Parcel Number / County:</strong> ${escapeHtml(parcelNumber)}</p>` : ''}
        ${notes ? `<p><strong>Additional Notes:</strong><br/>${escapeHtml(notes)}</p>` : ''}
        <p><strong>Source:</strong> ${fromWayne ? 'Wayne AI avatar — written form' : isFollowUp ? 'Property Review follow-up form' : 'Homepage — Property Review form'}</p>
      `,
    });

    try {
      await upsertCrmContact(context.env, {
        name: fullName,
        email,
        phone,
        address,
        source: fromWayne
          ? 'OVLP Website — Wayne Avatar Form'
          : isFollowUp
            ? 'OVLP Website — Property Review Follow-up'
            : 'OVLP Website — Property Review',
        tags: [
          'seller-property-review',
          ...(fromWayne ? ['wayne-avatar'] : []),
          ...(isFollowUp ? ['seller-property-review-details'] : []),
        ],
      });
    } catch (crmError) {
      console.error('Seller CRM update failed after notification:', crmError);
    }

    return jsonResponse({ success: true }, 201);
  } catch (err) {
    console.error('Seller form error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
