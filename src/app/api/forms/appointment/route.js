export async function POST(request) {
  const contentType = request.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await request.json()
    : Object.fromEntries((await request.formData()).entries());

  const requiredFields = [
    "appointmentDate",
    "appointmentTime",
    "firstName",
    "lastName",
    "email",
    "phone",
    "contactMethod",
  ];
  const missingField = requiredFields.find((field) => !data?.[field]);

  if (missingField) {
    return Response.json(
      { error: "Missing required fields." },
      {
        status: 400,
      }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      {
        status: 400,
      }
    );
  }

  return Response.json(
    {
      message: "Appointment request received.",
    },
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    }
  );
}
