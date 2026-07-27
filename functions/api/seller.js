import { escapeHtml, guardFormRequest, jsonResponse } from '../_utils.js';
import { sendNotification, upsertCrmContact } from '../_delivery.js';

export async function onRequestPost(context) {
  try {
    const guard = await guardFormRequest(context);
    if (!guard.ok) return guard.response;

    const { address, email, stage, fullName, parcelNumber, notes } = guard.body;
    const isFollowUp = stage === 'follow-up';

    if (!address?.trim() || !email?.trim()) {
      return jsonResponse({ error: 'Address and email are required' }, 400);
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
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${fullName ? `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>` : ''}
        ${parcelNumber ? `<p><strong>Parcel Number / County:</strong> ${escapeHtml(parcelNumber)}</p>` : ''}
        ${notes ? `<p><strong>Additional Notes:</strong><br/>${escapeHtml(notes)}</p>` : ''}
        <p><strong>Phone:</strong> Not collected on this form. Phone/SMS opt-in is handled by the GHL chat widget.</p>
        <p><strong>Source:</strong> ${isFollowUp ? 'Property Review follow-up form' : 'Homepage — Property Review form'}</p>
      `,
    });

    try {
      await upsertCrmContact(context.env, {
        name: fullName,
        email,
        address,
        source: isFollowUp
          ? 'OVLP Website — Property Review Follow-up'
          : 'OVLP Website — Property Review',
        tags: ['seller-property-review', ...(isFollowUp ? ['seller-property-review-details'] : [])],
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
