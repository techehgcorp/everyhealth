import { google } from "googleapis";
import { NextResponse } from "next/server";
import moment from "moment";

const spreadsheetId = "1y6lTtqhdQOZSjoJViedVWD3hs9-F-jhgYfYAcp43UM0";
const range = "Appointment!A:I";

const contactMethodLabels = {
  office: "Face-to-Face Office Meeting",
  phone: "Appointment by Phone",
  virtual: "Virtual Meeting via Google Meet",
};

const requiredFields = [
  "appointmentDate",
  "appointmentTime",
  "firstName",
  "lastName",
  "email",
  "phone",
  "contactMethod",
];

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await req.json()
      : Object.fromEntries((await req.formData()).entries());

    const missingField = requiredFields.find((field) => !String(body?.[field] || "").trim());

    if (missingField) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      throw new Error("Google Sheets credentials are not configured.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const submittedAt = moment.utc(new Date()).local().format("MM-DD-YYYY HH:mm:ss Z");
    const contactMethod = contactMethodLabels[body.contactMethod] || body.contactMethod;

    const values = [
      [
        body.appointmentDate,
        body.appointmentTime,
        body.firstName,
        body.lastName,
        body.email,
        body.phone,
        contactMethod,
        body.comments || "",
        submittedAt,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    });

    return NextResponse.json({
      message: "Appointment request saved successfully.",
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Unable to save appointment request.",
        status: 500,
      },
      { status: 500 }
    );
  }
}
