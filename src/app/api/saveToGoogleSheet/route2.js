import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req) {
    try {
      const body = await req.json();
      const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');
      // Authorize the client
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
          private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Ensure the key is correctly formatted
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      // Append the form data to Google Sheets
      const spreadsheetId = '1y6lTtqhdQOZSjoJViedVWD3hs9-F-jhgYfYAcp43UM0';
      const range = 'Sheet1!A:K'; // Adjust based on your sheet structure
      const values = [[body?.zipCode,
                        body?.coverage,
                        body?.insurance,
                        body?.income,
                        `${body?.name} ${body?.lastName}`, 
                        body?.dob,
                        body?.address,
                        body?.state,
                        body?.email,
                        body?.phone,
                        dateTime]];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      });

      return NextResponse.json({ message: 'Data saved to Google Sheets successfully', status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error, status: 500 }, { status: 500 });
    }
}
