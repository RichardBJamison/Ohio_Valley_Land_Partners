const DEFAULT_GHL_LOCATION_ID = 'bNT4wp0nukIQdBJbQDaa';
const NOTIFICATION_CONTACT_ID = 'iEWFMH1a30jMEB65nzW2';
const NOTIFICATION_SENDER = 'info@ohiovalleylandpartners.com';
const NOTIFICATION_RECIPIENT = 'rbjpholdings@gmail.com';

function cleanHeader(value, maxLength = 254) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function highLevelHeaders(env, json = false) {
  if (!env.GHL_API_TOKEN) {
    throw new Error('HighLevel delivery is not configured');
  }

  return {
    Authorization: `Bearer ${env.GHL_API_TOKEN}`,
    Accept: 'application/json',
    Version: '2021-07-28',
    ...(json ? { 'Content-Type': 'application/json' } : {}),
  };
}

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

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

async function uploadAttachment(env, attachment) {
  const locationId = env.GHL_LOCATION_ID || DEFAULT_GHL_LOCATION_ID;
  const filename = cleanHeader(attachment.filename, 180).replace(/[^\x20-\x7E]|["\\]/g, '_');
  const contentType = cleanHeader(attachment.type, 120) || 'application/octet-stream';
  const form = new FormData();
  form.append('file', new Blob([decodeBase64(attachment.content)], { type: contentType }), filename);
  form.append('hosted', 'false');
  form.append('name', cleanHeader(`OVLP Website Upload — ${filename}`, 180));
  form.append('altId', locationId);
  form.append('altType', 'location');

  const response = await fetch('https://services.leadconnectorhq.com/medias/upload-file', {
    method: 'POST',
    headers: highLevelHeaders(env),
    body: form,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.fileId || !payload.url) {
    throw new Error(`HighLevel attachment upload failed (${response.status})`);
  }
  return { id: payload.fileId, url: payload.url };
}

async function deleteMedia(env, id) {
  const locationId = env.GHL_LOCATION_ID || DEFAULT_GHL_LOCATION_ID;
  const target = new URL(`https://services.leadconnectorhq.com/medias/${encodeURIComponent(id)}`);
  target.searchParams.set('altId', locationId);
  target.searchParams.set('altType', 'location');
  await fetch(target, {
    method: 'DELETE',
    headers: highLevelHeaders(env),
  });
}

export async function sendNotification(env, options) {
  const locationId = env.GHL_LOCATION_ID || DEFAULT_GHL_LOCATION_ID;
  const uploaded = [];

  try {
    for (const attachment of options.attachments || []) {
      uploaded.push(await uploadAttachment(env, attachment));
    }

    const html = String(options.html || '');
    const response = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: highLevelHeaders(env, true),
      body: JSON.stringify({
        type: 'Email',
        contactId: NOTIFICATION_CONTACT_ID,
        locationId,
        emailFrom: NOTIFICATION_SENDER,
        emailTo: NOTIFICATION_RECIPIENT,
        subject: cleanHeader(options.subject, 160),
        html,
        message: plainText(html),
        status: 'pending',
        ...(uploaded.length ? { attachments: uploaded.map((file) => file.url) } : {}),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.messageId) {
      throw new Error(`HighLevel email delivery failed (${response.status})`);
    }
    return payload;
  } catch (error) {
    await Promise.allSettled(uploaded.map((file) => deleteMedia(env, file.id)));
    throw error;
  }
}

export async function upsertCrmContact(env, details) {
  const locationId = env.GHL_LOCATION_ID || DEFAULT_GHL_LOCATION_ID;
  const body = {
    locationId,
    email: cleanHeader(details.email),
    source: cleanHeader(details.source || 'OVLP Website', 120),
    tags: ['ovlp-website', ...(details.tags || [])].map((tag) => cleanHeader(tag, 80)),
  };
  if (details.name) body.name = cleanHeader(details.name, 120);
  if (details.phone) body.phone = cleanHeader(details.phone, 40);
  if (details.address) body.address1 = cleanHeader(details.address, 180);

  const response = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: highLevelHeaders(env, true),
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.contact?.id) {
    throw new Error(`HighLevel CRM routing failed (${response.status})`);
  }
  return payload;
}
