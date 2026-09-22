import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req) {
    try {
        const body = await req.json();
        const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');

        // Autorizar o cliente
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
                private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Garantir que a chave está correta
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Primeiro, salvar os dados na **primeira planilha** (todos os campos)
        const spreadsheetId1 = '1y6lTtqhdQOZSjoJViedVWD3hs9-F-jhgYfYAcp43UM0'; // ID da primeira planilha
        const range1 = 'Sheet1!A:K'; // Ajustado para 11 colunas (todos os campos)

        const values1 = [
            [
                body?.zipCode,
                body?.coverage,
                body?.insurance,
                body?.income,
                `${body?.name} ${body?.lastName}`, // Nome completo
                body?.dob,
                body?.address,
                body?.state,
                body?.email,
                body?.phone,
                dateTime, // Data e hora
            ]
        ];

        // Salvar os dados na primeira planilha
        await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId1,
            range: range1,
            valueInputOption: 'RAW',
            resource: {
                values: values1,
            },
        });

        // Agora, salvar os dados na **segunda planilha** (apenas Name, Last Name, Email e Phone)
        const spreadsheetId2 = '1iym3IALtjPl-mW59lS-_Z8Hfk4R4TDh1ckQ5ksmnFTs'; // ID da segunda planilha
        const range2 = 'Sheet1!A:K'; // Ajustado para 4 colunas (Name, Last Name, Email, Phone)

        const values2 = [
            [
                `${body?.name} ${body?.lastName}`, // Nome completo
                body?.email,  // Email
                body?.phone,  // Telefone
                dateTime      // Data e hora
            ]
        ];

        // Salvar os dados na segunda planilha
        await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId2,
            range: range2,
            valueInputOption: 'RAW',
            resource: {
                values: values2,
            },
        });

        // Retorno de sucesso
        return NextResponse.json({ message: 'Data saved to both Google Sheets successfully', status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message, status: 500 }, { status: 500 });
    }
}
