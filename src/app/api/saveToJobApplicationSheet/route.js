import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export const runtime = 'nodejs';
export const maxDuration = 30;

const CLIENT_EMAIL =
  process.env.GOOGLE_CLIENT_EMAIL || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY || process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY;

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
// Tab name contains spaces, so the range is single-quoted below.
const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB_JOBS || 'JobApplications OEP 2026';

function joinList(value) {
  if (!Array.isArray(value)) return '';
  return value.filter(Boolean).join(', ');
}

function formatIdLinks(front, back) {
  return [front ? `Front: ${front}` : '', back ? `Back: ${back}` : '']
    .filter(Boolean)
    .join('  |  ');
}

function formatCarriers(carriers) {
  if (!Array.isArray(carriers)) return '';
  return carriers
    .filter((c) => c && (c.name || c.otherNames || c.states))
    .map((c) => {
      const name = c.name === 'Other' && c.otherNames ? c.otherNames : c.name;
      return `${name || 'Unnamed'} (${c.states || 'states not given'})`;
    })
    .join(' | ');
}

export async function POST(req) {
  try {
    if (!CLIENT_EMAIL || !PRIVATE_KEY) {
      throw new Error('Google credentials are not configured on the server.');
    }
    if (!SPREADSHEET_ID) {
      throw new Error('Spreadsheet is not configured on the server.');
    }

    const body = await req.json();
    const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Column order must match the header row. See SETUP.md.
    const values = [
      [
        dateTime,                                   // A  Submitted
        body?.firstName,                            // B  First Name
        body?.middleName,                           // C  Middle Name
        body?.lastName,                             // D  Last Name
        body?.dob,                                  // E  Date of Birth
        body?.email,                                // F  Email
        body?.phone,                                // G  Phone
        body?.address1,                             // H  Address Line 1
        body?.address2,                             // I  Address Line 2
        body?.city,                                 // J  City
        body?.state,                                // K  State
        body?.zipCode,                              // L  Zip Code
        body?.ssn,                                  // M  SSN (see COLLECT_SSN flag)
        formatIdLinks(body?.usaIdFrontLink, body?.usaIdBackLink), // N Driver License ID (front + back)
        body?.ssnCardLink,                          // O  SSN Card
        body?.licenseType,                          // P  License Type
        body?.npn,                                  // Q  NPN
        body?.businessEntity,                       // R  Business Entity?
        body?.businessEntityNpn,                    // S  Business Entity NPN
        joinList(body?.licensedStates),             // T  Licensed States
        body?.currentlyAppointed,                   // U  Currently Appointed?
        formatCarriers(body?.carriers),             // V  Carrier Appointments
        body?.yearsExperience,                      // W  Years Experience
        body?.oepAvailability,                      // X  OEP Availability
        joinList(body?.licenseProofLinks),          // Y  Proof of License
        body?.ffmCertified,                         // Z  FFM Certified?
        body?.ffmCertificationLink,                 // AA FFM Certification
        body?.ffmUsername,                          // AB FFM Username
        body?.certifyAccurate ? 'Yes' : 'No',       // AC Certify Accurate
        body?.authorizeVerification ? 'Yes' : 'No', // AD Authorize Verification
        body?.understandContingent ? 'Yes' : 'No',  // AE Understand Contingent
        body?.referredBy,                           // AF Referred By
        body?.position,                             // AG Position Applied For
        body?.previousEmployer,                     // AH Previous Employer
        body?.lastProductSold,                      // AI Last Product Sold
        body?.soldAca,                              // AJ Sold ACA Before
        body?.eoInsurance,                          // AK E&O Insurance
        body?.ffmPriorYear,                         // AL FFM Prior Year
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${SHEET_TAB}'!A:AL`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    });

    return NextResponse.json({ message: 'Application received', status: 200 });
  } catch (error) {
    console.error('[saveToJobApplicationSheet]', error);
    return NextResponse.json(
      { error: 'We could not submit your application. Please try again.' },
      { status: 500 }
    );
  }
}
