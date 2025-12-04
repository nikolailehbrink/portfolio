import { newsletterFormSchema, contactFormSchema } from "@/lib/definitions";
import { resend } from "@/lib/resend";
import { createSignedToken } from "@/lib/token";
import { parseSubmission, report } from "@conform-to/react/future";
import { track } from "@vercel/analytics/server";
import { defineAction } from "astro:actions";
import NewsletterVerificationEmail, {
  PlainText,
} from "@/components/react/emails/newsletter-verification";
import { z } from "astro:schema";
import { db, eq, sql, ViewCount } from "astro:db";
import { RESEND_NEWSLETTER_AUDIENCE_ID } from "@/consts";

export const server = {
  newsletter: defineAction({
    accept: "form",
    handler: async (formData, ctx) => {
      const {
        request: { headers, url },
      } = ctx;
      const { origin } = new URL(url);

      const submission = parseSubmission(formData);
      const result = newsletterFormSchema.safeParse(submission.payload);

      if (!result.success) {
        return {
          result: report(submission, {
            error: {
              issues: result.error.issues,
            },
          }),
        };
      }

      const { email, company: honeypot } = result.data;

      if (honeypot !== undefined) {
        await track("honeypot-triggered", {
          form: "newsletter-signup",
          input: honeypot,
        });
        return {
          result: report(submission),
        };
      }

      const { data: contact } = await resend.contacts.get({
        email,
        audienceId: RESEND_NEWSLETTER_AUDIENCE_ID,
      });

      if (contact) {
        return {
          result: report(submission, {
            error: {
              formErrors: ["You are already subscribed to the newsletter."],
            },
          }),
        };
      }

      const token = createSignedToken(email);
      const confirmationLink = `${origin}/api/newsletter/verification?token=${token}`;

      const { error } = await resend.emails.send({
        from: "Nikolai Lehbrink <mail@nikolailehbr.ink>",
        to: [import.meta.env.DEV ? "delivered@resend.dev" : email],
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
        react: NewsletterVerificationEmail({
          confirmationLink,
        }),
      });

      if (error) {
        console.error("Error sending confirmation email:", error);
        return {
          result: report(submission, {
            error: {
              formErrors: [
                "There was an error sending the confirmation email. Please try again later.",
              ],
            },
          }),
        };
      }

      const referrer = headers.get("referer");
      const referrerPath = referrer ? new URL(referrer).pathname : null;

      await track("newsletter-signup", {
        email,
        path: referrerPath,
      });

      return {
        result: report(submission),
        success: true,
      };
    },
  }),
  contact: defineAction({
    accept: "form",
    handler: async (formData) => {
      const submission = parseSubmission(formData);
      const result = contactFormSchema.safeParse(submission.payload);

      if (!result.success) {
        return {
          result: report(submission, {
            error: {
              issues: result.error.issues,
            },
          }),
        };
      }

      const {
        email,
        name,
        subject,
        phone,
        message,
        company: honeypot,
      } = result.data;

      if (honeypot !== undefined) {
        await track("honeypot-triggered", {
          form: "contact",
          input: honeypot,
        });
        return {
          result: report(submission),
        };
      }

      const { error } = await resend.emails.send({
        from: "Kontaktformular <contact-form@nikolailehbr.ink>",
        replyTo: email,
        to: [
          import.meta.env.DEV
            ? "delivered@resend.dev"
            : "mail@nikolailehbr.ink",
        ],
        subject: subject ?? "New inquiry",
        html: `
        ${name && `<p>Name: ${name}</p>`}
        ${phone && `<p>Phone: ${phone}</p>`}
        <p>Message: ${message}</p>
    `,
        text: `
        ${name && `Name: ${name}\n`}
        ${phone && `Phone: ${phone}\n`}
        Message: ${message}
    `,
        tags: [
          {
            name: "category",
            value: "contact_form",
          },
        ],
      });

      if (error) {
        console.error(error);
        return {
          result: report(submission, {
            error: {
              formErrors: [
                "Failed to send the message. Please try again later.",
              ],
            },
          }),
        };
      }

      return {
        result: report(submission),
        success: true,
      };
    },
  }),
  pageViews: {
    increment: defineAction({
      input: z.object({
        pathname: z.string(),
      }),
      async handler(input) {
        const { pathname } = input;

        const updatedViewCount = await db
          .insert(ViewCount)
          .values({
            pathname,
          })
          .onConflictDoUpdate({
            target: ViewCount.pathname,
            set: {
              views: sql`views + 1`,
            },
          })
          .returning();
        return updatedViewCount[0].views;
      },
    }),
    get: defineAction({
      input: z.object({
        pathname: z.string(),
      }),
      async handler(input) {
        const { pathname } = input;
        const viewCount = await db
          .select()
          .from(ViewCount)
          .where(eq(ViewCount.pathname, pathname));
        return viewCount[0]?.views ?? 0;
      },
    }),
    getAll: defineAction({
      async handler() {
        const views = await db.select().from(ViewCount);
        return views.reduce((acc, current) => acc + current.views, 0);
      },
    }),
  },
};
