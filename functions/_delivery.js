let cachedGoogleToken = null;

function bytesToBase64(bytes) {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

function utf8Base64(value) {
  return bytesToBase64(new TextEncoder().encode(String(value)));
}

function base64Url(value) {
  return utf8Base64(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function bytesToBase64Url(bytes) {
  return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function pemBytes(value) {
  const base64 = value.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '');
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function cleanHeader(value, maxLength = 254) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function wrapBase64(value) {
  return value.match(/.{1,76}/g)?.join('\r\n') || '';
}

async function googleAccessToken(serviceAccountJson) {
  if (cachedGoogleToken?.expiresAt > Date.now() + 60_000) return cachedGoogleToken.value;

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(serviceAccountJson);
  } catch {
    throw new Error('Google Workspace delivery is not configured');
  }

  if (!serviceAccount?.client_email || !serviceAccount?.private_key) {
    throw new Error('Google Workspace delivery is not configured');
  }

  const now = Math.floor(Date.now() / 1000);
  const unsigned = [
    base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
    base64Url(JSON.stringify({
      iss: serviceAccount.client_email,
      sub: 'info@ohiovalleylandpartners.com',
      scope: 'https://www.googleapis.com/auth/gmail.send',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })),
  ].join('.');

  const signingKey = await crypto.subtle.importKey(
    'pkcs8',
    pemBytes(serviceAccount.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    signingKey,
    new TextEncoder().encode(unsigned),
  );
  const assertion = `${unsigned}.${bytesToBase64Url(new Uint8Array(signature))}`;
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error('Google Workspace authorization failed');
  }

  cachedGoogleToken = {
    value: payload.access_token,
    expiresAt: Date.now() + Math.max(300, Number(payload.expires_in || 3600)) * 1000,
  };
  return cachedGoogleToken.value;
}

function buildMimeMessage({ subject, html, replyTo, attachments = [] }) {
  const headers = [
    'From: OVLP Website <info@ohiovalleylandpartners.com>',
    'To: info@ohiovalleylandpartners.com',
    `Subject: =?UTF-8?B?${utf8Base64(cleanHeader(subject, 160))}?=`,
    'MIME-Version: 1.0',
  ];
  if (replyTo) headers.splice(2, 0, `Reply-To: ${cleanHeader(replyTo)}`);

  if (attachments.length === 0) {
    return [
      ...headers,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: base64',
      '',
      wrapBase64(utf8Base64(html)),
    ].join('\r\n');
  }

  const boundary = `ovlp_${crypto.randomUUID().replace(/-/g, '')}`;
  const parts = [
    ...headers,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrapBase64(utf8Base64(html)),
  ];

  for (const attachment of attachments) {
    const filename = cleanHeader(attachment.filename, 180).replace(/[^\x20-\x7E]|["\\]/g, '_');
    parts.push(
      `--${boundary}`,
      `Content-Type: ${cleanHeader(attachment.type, 120)}; name="${filename}"`,
      `Content-Disposition: attachment; filename="${filename}"`,
      'Content-Transfer-Encoding: base64',
      '',
      wrapBase64(attachment.content),
    );
  }
  parts.push(`--${boundary}--`, '');
  return parts.join('\r\n');
}

export async function sendNotification(env, options) {
  const token = await googleAccessToken(env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const message = buildMimeMessage(options);
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: bytesToBase64Url(new TextEncoder().encode(message)) }),
  });
  if (!response.ok) {
    throw new Error(`Google Workspace delivery failed (${response.status})`);
  }
  return response.json();
}

export async function upsertCrmContact(env, details) {
  if (!env.GHL_API_TOKEN || !env.GHL_LOCATION_ID) {
    throw new Error('HighLevel CRM routing is not configured');
  }

  const body = {
    locationId: env.GHL_LOCATION_ID,
    email: cleanHeader(details.email),
    source: cleanHeader(details.source || 'OVLP Website', 120),
    tags: ['ovlp-website', ...(details.tags || [])].map((tag) => cleanHeader(tag, 80)),
  };
  if (details.name) body.name = cleanHeader(details.name, 120);
  if (details.phone) body.phone = cleanHeader(details.phone, 40);
  if (details.address) body.address1 = cleanHeader(details.address, 180);

  const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GHL_API_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.contact?.id) {
    throw new Error(`HighLevel CRM routing failed (${response.status})`);
  }
  return payload;
}
