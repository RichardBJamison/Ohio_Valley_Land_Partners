import { escapeHtml, guardFormRequest, jsonResponse } from '../_utils.js';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 15 * 1024 * 1024;
const MIME_BY_EXTENSION = {
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
};

function decodedBase64Bytes(value) {
  const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
  return Math.floor((value.length * 3) / 4) - padding;
}

export async function onRequestPost(context) {
  try {
    const guard = await guardFormRequest(context, { maxBodyBytes: MAX_REQUEST_BYTES });
    if (!guard.ok) return guard.response;

    const { name, email, fileName, fileData } = guard.body;

    if (!name?.trim() || !email?.trim()) {
      return jsonResponse({ error: 'Name and email are required' }, 400);
    }

    if (typeof fileData !== 'string' || typeof fileName !== 'string') {
      return jsonResponse({ error: 'File is required' }, 400);
    }

    const safeFileName = fileName.split(/[\\/]/).pop()?.slice(0, 180) ?? '';
    const extension = safeFileName.split('.').pop()?.toLowerCase();
    const contentType = extension ? MIME_BY_EXTENSION[extension] : undefined;
    const validBase64 = fileData.length > 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(fileData);

    if (!safeFileName || !contentType || !validBase64) {
      return jsonResponse({ error: 'Only CSV, XLSX, and XLS files are accepted' }, 400);
    }

    if (decodedBase64Bytes(fileData) > MAX_FILE_BYTES) {
      return jsonResponse({ error: 'File must be 10 MB or smaller' }, 413);
    }

    const safeName = String(name).trim().replace(/[\r\n]+/g, ' ').slice(0, 80);
    const safeEmail = String(email).trim().replace(/[\r\n]+/g, ' ').slice(0, 254);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OVLP Website <noreply@ohiovalleylandpartners.com>',
        to: 'info@ohiovalleylandpartners.com',
        subject: `Property Upload — ${safeName}`,
        html: `
          <h2>New Property Upload</h2>
          <p><strong>From:</strong> ${escapeHtml(safeName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
          <p><strong>File:</strong> ${escapeHtml(safeFileName)}</p>
          <p><strong>Source:</strong> Builders Network — Property Uploads page</p>
          <p>The spreadsheet is attached below.</p>
        `,
        attachments: [
          {
            filename: safeFileName,
            content: fileData,
            type: contentType,
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return jsonResponse({ error: 'Failed to submit' }, 500);
    }

    return jsonResponse({ success: true }, 201);
  } catch (err) {
    console.error('Property upload error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
}
