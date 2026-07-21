import { escapeHtml, guardFormRequest, jsonResponse } from '../_utils.js';
import { sendNotification, upsertCrmContact } from '../_delivery.js';

export async function onRequestPost(context) {
  try {
    const guard = await guardFormRequest(context);
    if (!guard.ok) return guard.response;

    const { fullName, email, phone, company, leadType, propertyInterest, budgetRange, message, source } = guard.body;

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }

    await upsertCrmContact(context.env, {
      name: fullName,
      email,
      phone,
      source: `OVLP Website — ${leadType || 'Inquiry'}`,
      tags: ['contact-form', `interest-${leadType || 'inquiry'}`],
    });
    await sendNotification(context.env, {
      subject: `New Contact Form Submission — ${String(fullName).slice(0, 80)}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>Lead Type:</strong> ${escapeHtml(leadType || 'inquiry')}</p>
        ${propertyInterest ? `<p><strong>Property Interest:</strong> ${escapeHtml(propertyInterest)}</p>` : ''}
        ${budgetRange ? `<p><strong>Budget Range:</strong> ${escapeHtml(budgetRange)}</p>` : ''}
        <p><strong>Message:</strong><br/>${escapeHtml(message)}</p>
        <p><strong>Source:</strong> ${escapeHtml(source || 'website')}</p>
      `,
    });

    return jsonResponse({ success: true }, 201);
  } catch (err) {
    console.error('Contact form error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
