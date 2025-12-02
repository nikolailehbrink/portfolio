import { coerceFormValue } from "@conform-to/zod/v4/future";
import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const newsletterFormSchema = coerceFormValue(
  z.object({
    email: z.email("Please enter a valid email address."),
    company: z.string().optional(),
  }),
);

export const contactFormSchema = coerceFormValue(
  z.object({
    email: z.email("Please enter a valid email address."),
    name: z.string().min(2, "Name must be at least 2 characters.").optional(),
    subject: z
      .string()
      .min(2, "Subject must be at least 2 characters.")
      .max(50, "Subject must be less than 50 characters.")
      .optional(),
    phone: z.string().regex(phoneRegex, "Invalid phone number!").optional(),
    message: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "The message is required." : null,
      })
      .min(10, "Message must be at least 10 characters.")
      .max(500, "Message must be less than 500 characters."),
    company: z.string().optional(),
  }),
);
