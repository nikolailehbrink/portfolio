import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useFetcher, type FormProps } from "react-router";
import { Label } from "./ui/label";
import {
  At,
  CheckCircle,
  CircleNotch,
  IdentificationBadge,
  PaperPlaneTilt,
  PhoneTransfer,
  TextAlignLeft,
  Textbox,
} from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import type { action } from "@/routes/index";
import FormMessage from "./FormMessage";
import FormItem from "./FormItem";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const schema = z.object({
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
});

export default function ContactForm({ className, ...props }: FormProps) {
  const { Form, data, state } = useFetcher<typeof action>({
    key: "contact-form",
  });
  const [form, fields] = useForm({
    // This not only syncs the error from the server
    // But is also used as the default value of the form
    // in case the document is reloaded for progressive enhancement
    lastResult: data,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema });
    },
    // To derive all validation attributes
    constraint: getZodConstraint(schema),
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
    id: "contact",
  });

  const isLoading = state !== "idle";
  const sendSuccessfully = data?.status === "success";

  return (
    <Form
      method="POST"
      className={cn(
        `inline-grid w-full grid-cols-1 gap-4 rounded-xl border bg-neutral-900
        p-4 offset-border @lg:grid-cols-2`,
        className,
      )}
      action="/?index"
      {...props}
      {...getFormProps(form)}
    >
      <FormItem>
        <Label htmlFor={fields.email.id}>
          <At weight="duotone" size={20} />
          Email
        </Label>
        <Input
          {...getInputProps(fields.email, { type: "email" })}
          placeholder="john.doe@example.com"
        />
        <FormMessage id={fields.email.errorId}>
          {fields.email.errors}
        </FormMessage>
      </FormItem>
      <FormItem>
        <Label htmlFor={fields.name.id}>
          <IdentificationBadge weight="duotone" size={20} />
          Name
        </Label>
        <Input
          {...getInputProps(fields.name, { type: "text" })}
          placeholder="John Doe"
        />
        <FormMessage id={fields.name.errorId}>{fields.name.errors}</FormMessage>
      </FormItem>
      <FormItem>
        <Label htmlFor={fields.subject.id}>
          <Textbox weight="duotone" size={20} />
          Subject
        </Label>
        <Input
          {...getInputProps(fields.subject, { type: "text" })}
          placeholder="What can I help you with?"
        />
        <FormMessage id={fields.subject.errorId}>
          {fields.subject.errors}
        </FormMessage>
      </FormItem>
      <FormItem>
        <Label htmlFor={fields.phone.id}>
          <PhoneTransfer weight="duotone" size={20} />
          Phone
        </Label>
        <Input
          {...getInputProps(fields.phone, { type: "text" })}
          placeholder="+49 12345 6789"
        />
        <FormMessage id={fields.phone.errorId}>
          {fields.phone.errors}
        </FormMessage>
      </FormItem>

      <FormItem className="@lg:col-span-2">
        <Label htmlFor={fields.message.id}>
          <TextAlignLeft weight="duotone" size={20} />
          Message
        </Label>
        <Textarea
          {...getTextareaProps(fields.message)}
          placeholder="Type your message here."
        />
        <FormMessage id={fields.message.errorId}>
          {fields.message.errors}
        </FormMessage>
      </FormItem>
      {form.errors && form.errors.length > 0 ? (
        <FormMessage
          className="col-span-full items-start rounded-md border border-red-900
            bg-red-950 p-2"
          iconSize={20}
        >
          {form.errors.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </FormMessage>
      ) : null}
      {sendSuccessfully && (
        <FormMessage
          className="col-span-full items-start rounded-md border border-sky-900
            bg-sky-950 p-2 text-sky-400"
          icon={CheckCircle}
          iconSize={20}
        >
          Thank you for your message! I will get back to you as soon as
          possible.
        </FormMessage>
      )}
      <Button className="col-span-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            Sending
            <CircleNotch className="animate-spin" weight="duotone" size={20} />
          </>
        ) : (
          <>
            Submit
            <PaperPlaneTilt weight="duotone" size={20} />
          </>
        )}
      </Button>
    </Form>
  );
}
