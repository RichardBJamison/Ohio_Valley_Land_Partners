const ALLOWED_ORIGINS = new Set([
  'https://ohiovalleylandpartners.com',
  'https://www.ohiovalleylandpartners.com',
]);

const MAX_BODY_BYTES = 32 * 1024;

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function checkOrigin(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer') ?? '';
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  return [...ALLOWED_ORIGINS].some((allowed) => referer.startsWith(`${allowed}/`));
}

export async function readJsonBody(request, maxBodyBytes = MAX_BODY_BYTES) {
  const raw = await request.text();
  if (raw.length > maxBodyBytes) {
    throw new Error('Payload too large');
  }
  return JSON.parse(raw);
}

export async function verifyTurnstile(token, secret, ip) {
  if (!secret) return null;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const data = await res.json();
  return Boolean(data.success);
}

export function clientIp(request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function guardFormRequest(context, options = {}) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return { ok: false, response: jsonResponse({ error: 'Method not allowed' }, 405) };
  }

  if (!checkOrigin(request)) {
    return { ok: false, response: jsonResponse({ error: 'Forbidden' }, 403) };
  }

  let body;
  try {
    body = await readJsonBody(request, options.maxBodyBytes);
  } catch {
    return { ok: false, response: jsonResponse({ error: 'Invalid request' }, 400) };
  }

  const startedAt = Number(body.startedAt);
  const elapsedMs = Date.now() - startedAt;
  if (body.website || !Number.isFinite(startedAt) || elapsedMs < 1500 || elapsedMs > 2 * 60 * 60 * 1000) {
    return { ok: false, response: jsonResponse({ error: 'Security check failed' }, 403) };
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp(request));
  if (turnstileOk === false) {
    return { ok: false, response: jsonResponse({ error: 'Security check failed' }, 403) };
  }

  return { ok: true, body };
}
