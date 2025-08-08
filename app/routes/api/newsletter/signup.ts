import { parseWithZod } from "@conform-to/zod/v4";
import { track } from "@vercel/analytics/server";
import { data, href } from "react-router";

import NewsletterVerificationEmail, {
  PlainText,
} from "@/components/emails/newsletter-verification";
import { schema as newsletterFormSchema } from "@/components/NewsletterForm";
import { resend } from "@/lib/resend.server";
import { createSignedToken } from "@/lib/token";

import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
  const { headers, url } = request;
  const { origin } = new URL(url);

  const formData = await request.formData();

  const honeypot = formData.get("company");

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    await track("honeypot-triggered", {
      form: "newsletter-signup",
      input: honeypot,
    });
    return data({ success: true });
  }
  const submission = parseWithZod(formData, { schema: newsletterFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email } = submission.value;

  const { data: contact } = await resend.contacts.get({
    audienceId: "1a231b09-a625-43c1-9cc2-5d8f34972bdb",
    email,
  });

  if (contact) {
    return submission.reply({
      formErrors: ["You are already subscribed to the newsletter."],
    });
  }

  const token = createSignedToken(email);

  const confirmationLink = `${origin}${href("/api/newsletter/verification")}?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Nikolai Lehbrink <mail@nikolailehbr.ink>",
    react: NewsletterVerificationEmail({
      confirmationLink,
    }),
    subject: "Confirm your newsletter subscription",
    tags: [
      {
        name: "category",
        value: "newsletter-form",
      },
    ],
    text: PlainText({
      confirmationLink,
    }),
    to: [import.meta.env.DEV ? "delivered@resend.dev" : email],
  });

  if (error) {
    console.error("Error sending confirmation email:", error);
    return submission.reply({
      formErrors: [
        "There was an error sending the confirmation email. Please try again later.",
      ],
    });
  }

  let referrer = headers.get("referer");

  if (referrer) {
    referrer = new URL(referrer).pathname;
  }

  await track("newsletter-signup", {
    email,
    path: referrer,
  });

  //https://github.com/edmundhung/conform/issues/410
  return {
    ...submission.reply(),
    ...submission.reply({
      resetForm: true,
    }),
  };
}
