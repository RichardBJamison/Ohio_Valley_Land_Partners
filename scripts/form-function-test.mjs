#!/usr/bin/env node

import assert from 'node:assert/strict';
import { guardFormRequest } from '../functions/_utils.js';
import { sendNotification, upsertCrmContact } from '../functions/_delivery.js';

function request(body, origin = 'https://ohiovalleylandpartners.com') {
  return new Request('https://ohiovalleylandpartners.com/api/seller', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validBody = { startedAt: Date.now() - 5000, website: '', address: '123 Test St', email: 'qa@example.com' };
let result = await guardFormRequest({ request: request(validBody), env: {} });
assert.equal(result.ok, true, 'passive anti-spam should accept a human-paced same-origin request');

result = await guardFormRequest({ request: request({ ...validBody, website: 'filled-by-bot' }), env: {} });
assert.equal(result.response.status, 403, 'honeypot submission should be rejected');

result = await guardFormRequest({ request: request({ ...validBody, startedAt: Date.now() }), env: {} });
assert.equal(result.response.status, 403, 'instant submission should be rejected');

result = await guardFormRequest({ request: request(validBody, 'https://example.invalid'), env: {} });
assert.equal(result.response.status, 403, 'foreign-origin submission should be rejected');

result = await guardFormRequest({ request: request(validBody), env: { TURNSTILE_SECRET_KEY: 'configured' } });
assert.equal(result.response.status, 403, 'configured Turnstile should require a token');

const requests = [];
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
  requests.push({ url: String(url), options });
  if (String(url).includes('services.leadconnectorhq.com/medias/upload-file')) {
    assert.equal(options.body.get('hosted'), 'false');
    assert.equal(options.body.get('altId'), 'qa-location');
    assert.equal(options.body.get('altType'), 'location');
    assert.equal(options.body.get('file').name, 'qa-properties.csv');
    return Response.json({ fileId: 'qa-file-id', url: 'https://storage.example.invalid/qa-properties.csv' }, { status: 201 });
  }
  if (String(url).includes('services.leadconnectorhq.com/conversations/messages')) {
    const payload = JSON.parse(options.body);
    assert.equal(payload.type, 'Email');
    assert.equal(payload.contactId, 'iEWFMH1a30jMEB65nzW2');
    assert.equal(payload.locationId, 'qa-location');
    assert.equal(payload.emailTo, 'info@ohiovalleylandpartners.com');
    assert.equal(payload.status, 'pending');
    assert.deepEqual(payload.attachments, ['https://storage.example.invalid/qa-properties.csv']);
    return Response.json({ messageId: 'qa-message-id', conversationId: 'qa-conversation-id' }, { status: 201 });
  }
  if (String(url).includes('services.leadconnectorhq.com/contacts/upsert')) {
    const payload = JSON.parse(options.body);
    assert.equal(payload.locationId, 'qa-location');
    assert.equal(payload.email, 'qa@example.com');
    return Response.json({ contact: { id: 'qa-contact-id' }, new: true });
  }
  throw new Error('Unexpected request: ' + url);
};

const env = {
  GHL_API_TOKEN: 'qa-ghl-token',
  GHL_LOCATION_ID: 'qa-location',
};

await upsertCrmContact(env, {
  email: 'qa@example.com',
  address: '123 Test St',
  source: 'OVLP Website QA',
  tags: ['release-test'],
});
await sendNotification(env, {
  subject: 'OVLP Website QA',
  replyTo: 'qa@example.com',
  html: '<p>Delivery test</p>',
  attachments: [{
    filename: 'qa-properties.csv',
    type: 'text/csv',
    content: Buffer.from('parcel_id,address\nQA-1,123 Test St\n').toString('base64'),
  }],
});
globalThis.fetch = originalFetch;

assert.equal(requests.filter((entry) => entry.url.includes('contacts/upsert')).length, 1);
assert.equal(requests.filter((entry) => entry.url.includes('medias/upload-file')).length, 1);
assert.equal(requests.filter((entry) => entry.url.includes('conversations/messages')).length, 1);
console.log(JSON.stringify({ passed: true, checks: 12 }, null, 2));
