import { google } from 'googleapis';
import moment from 'moment';

export async function POST(req) {
    try {
        const contentType = req.headers.get('content-type') || '';
        const body = contentType.includes('application/json')
            ? await req.json()
            : Object.fromEntries((await req.formData()).entries());

        const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');
        const description = [body?.subject, body?.message || body?.description]
            .filter(Boolean)
            .join('\n\n');

        // Autorizar o cliente
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
                private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Garantir que a chave está correta
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '1y6lTtqhdQOZSjoJViedVWD3hs9-F-jhgYfYAcp43UM0';
        const range = 'ContactForm!A:E';

        const values = [
            [
                body?.name,
                body?.phone || '',
                body?.email,
                description,
                dateTime,
            ]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: {
                values,
            },
        });

        return new Response('OK', {
            headers: {
                'content-type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(error.message, {
            status: 500,
            headers: {
                'content-type': 'text/plain; charset=utf-8',
            },
        });
    }
}
