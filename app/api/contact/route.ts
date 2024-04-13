import type { formSchemaType } from "@/components/pages/home/ContactForm";
import { isDev } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, message, name, phone, subject } =
    (await request.json()) as formSchemaType;

  try {
    const data = await resend.emails.send({
      from: "Kontaktformular <form@nikolailehbr.ink>",
      to: [isDev ? "delivered@resend.dev" : "mail@nikolailehbr.ink"],
      subject: subject || "New inquiry",
      html: `
          <p>Email: <a href="mailto:${email}${subject && "?subject=" + encodeURIComponent("Re: " + subject)}">${email}</a></p>
          ${name ? `<p>Name: ${name}</p>` : ""}
          ${phone ? `<p>Phone: ${phone}</p>` : ""}
          <p>Message: ${message}</p>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
