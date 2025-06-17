import { createSignedToken } from "@/lib/token";
import { data, href } from "react-router";
import { resend } from "@/lib/resend";
import NewsletterVerificationEmail, {
  PlainText,
} from "@/components/emails/newsletter-verification";
import { schema as newsletterFormSchema } from "@/components/NewsletterForm";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
  const { origin } = new URL(request.url);
  const formData = await request.formData();

  const honeypot = formData.get("company");

  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return data({ success: true });
  }
  const submission = parseWithZod(formData, { schema: newsletterFormSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email } = submission.value;

  const { data: contact } = await resend.contacts.get({
    email,
    audienceId: "1a231b09-a625-43c1-9cc2-5d8f34972bdb",
  });

  if (contact) {
    return submission.reply({
      formErrors: ["You are already subscribed to the newsletter."],
    });
  }

  const token = createSignedToken(email);

  const confirmationLink = `${origin}${href("/api/newsletter/verification")}?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Nikolai Lehbrink <newsletter@nikolailehbr.ink>",
    to: [import.meta.env.DEV ? "delivered@resend.dev" : email],
    subject: "Please confirm your newsletter subscription",
    tags: [
      {
        name: "category",
        value: "newsletter-form",
      },
    ],
    text: PlainText({
      confirmationLink,
      email,
    }),
    react: NewsletterVerificationEmail({
      confirmationLink,
      email,
    }),
  });

  if (error) {
    console.error("Error sending confirmation email:", error);
    return submission.reply({
      formErrors: [
        "There was an error sending the confirmation email. Please try again later.",
      ],
    });
  }

  //https://github.com/edmundhung/conform/issues/410
  return {
    ...submission.reply(),
    ...submission.reply({
      resetForm: true,
    }),
  };
}
