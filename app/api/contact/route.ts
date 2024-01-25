import type { formSchemaType } from "@/components/ContactForm";
import { Resend } from "resend";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // console.log(await request.json());
  const { email, message, name, phone, subject } =
    (await request.json()) as formSchemaType;

  console.log(email, message, name, phone, subject);

  try {
    const { data, error } = await resend.emails.send({
      from: "Kontaktformular <contact@nikolailehbr.ink>",
      to: ["mail@nikolailehbr.ink"],
      subject: subject ? subject : "Neue Anfrage",
      html: `
        <div>
          <p>Email: ${email}</p>
          ${name ? `<p>Name: ${name}</p>` : ""}
          ${phone ? `<p>Phone: ${phone}</p>` : ""}
          <p>Message: ${message}</p>
        </div>
      `,
    });

    if (error) {
      throw error;
    }
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
