import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import moment from 'moment';

export const runtime = 'nodejs';
export const maxDuration = 60;

const CLIENT_EMAIL =
  process.env.GOOGLE_CLIENT_EMAIL || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY || process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY;
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_UPLOADS_FOLDER_ID;

// Lambda caps the request body around 6MB and base64 inflates by ~33%,
// so a single decoded file must stay comfortably below that.
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/heic',
];

function sanitize(value, max = 80) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, max);
}

export async function POST(req) {
  try {
    if (!CLIENT_EMAIL || !PRIVATE_KEY) {
      throw new Error('Google credentials are not configured on the server.');
    }
    if (!DRIVE_FOLDER_ID) {
      throw new Error('Upload folder is not configured on the server.');
    }

    const body = await req.json();
    const { name, type, data, applicant, label } = body || {};

    if (!data) {
      throw new Error('No file was received.');
    }

    const base64 = String(data).includes(',')
      ? String(data).split(',')[1]
      : String(data);
    const buffer = Buffer.from(base64, 'base64');

    if (buffer.length > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: 'That file is larger than 4MB. Please upload a smaller file.' },
        { status: 413 }
      );
    }

    if (type && !ALLOWED_MIME.includes(type)) {
      return NextResponse.json(
        { error: 'That file type is not accepted. Use a PDF or an image.' },
        { status: 415 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const stamp = moment().format('YYYY-MM-DD_HHmmss');

    const fileName = [
      stamp,
      sanitize(applicant, 40) || 'applicant',
      sanitize(label, 30) || 'file',
      sanitize(name, 60) || 'upload',
    ].join('_');

    const created = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: type || 'application/octet-stream',
        body: Readable.from(buffer),
      },
      fields: 'id, webViewLink',
      supportsAllDrives: true, // required for Shared Drives
    });

    return NextResponse.json({
      link: created.data.webViewLink || '',
      id: created.data.id || '',
    });
  } catch (error) {
    console.error('[uploadApplicationFile]', error);
    return NextResponse.json(
      { error: 'We could not upload that file. Please try again.' },
      { status: 500 }
    );
  }
}
