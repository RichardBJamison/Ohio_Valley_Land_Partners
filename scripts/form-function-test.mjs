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

const keyPair = await crypto.subtle.generateKey(
  { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
  true,
  ['sign', 'verify'],
);
const privateKey = Buffer.from(await crypto.subtle.exportKey('pkcs8', keyPair.privateKey));
const privatePem = [
  '-----BEGIN PRIVATE KEY-----',
  ...privateKey.toString('base64').match(/.{1,64}/g),
  '-----END PRIVATE KEY-----',
].join('\n');

const requests = [];
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
  requests.push({ url: String(url), options });
  if (String(url).includes('oauth2.googleapis.com/token')) {
    return Response.json({ access_token: 'qa-google-token', expires_in: 3600 });
  }
  if (String(url).includes('gmail.googleapis.com')) {
    const payload = JSON.parse(options.body);
    assert.match(payload.raw, /^[A-Za-z0-9_-]+$/, 'Gmail raw message must be base64url encoded');
    return Response.json({ id: 'qa-message-id' });
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
  GOOGLE_SERVICE_ACCOUNT_JSON: JSON.stringify({
    client_email: 'qa-service-account@example.invalid',
    private_key: privatePem,
  }),
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
});
globalThis.fetch = originalFetch;

assert.equal(requests.filter((entry) => entry.url.includes('contacts/upsert')).length, 1);
assert.equal(requests.filter((entry) => entry.url.includes('messages/send')).length, 1);
console.log(JSON.stringify({ passed: true, checks: 9 }, null, 2));
