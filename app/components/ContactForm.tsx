import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import {
  AtIcon,
  CheckCircleIcon,
  CircleNotchIcon,
  IdentificationBadgeIcon,
  PaperPlaneTiltIcon,
  PhoneTransferIcon,
  TextAlignLeftIcon,
  TextboxIcon,
} from "@phosphor-icons/react";
import { type FormProps, useFetcher } from "react-router";
import { z } from "zod/v4";

import type { action } from "@/routes/index";

import { cn } from "@/lib/utils";

import FormItem from "./FormItem";
import FormMessage from "./FormMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const schema = z.object({
  email: z.email("Please enter a valid email address."),
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "The message is required." : null,
    })
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be less than 500 characters."),
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  phone: z.string().regex(phoneRegex, "Invalid phone number!").optional(),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters.")
    .max(50, "Subject must be less than 50 characters.")
    .optional(),
});

export default function ContactForm({ className, ...props }: FormProps) {
  const { data, Form, state } = useFetcher<typeof action>({
    key: "contact-form",
  });
  const [form, fields] = useForm({
    // To derive all validation attributes
    constraint: getZodConstraint(schema),
    id: "contact",
    // This not only syncs the error from the server
    // But is also used as the default value of the form
    // in case the document is reloaded for progressive enhancement
    lastResult: data,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
  });

  const isLoading = state !== "idle";
  const sendSuccessfully = data?.status === "success";

  return (
    <Form
      action="/?index"
      className={cn(
        `inline-grid w-full grid-cols-1 gap-4 rounded-xl border bg-neutral-900
        p-4 offset-border @lg:grid-cols-2`,
        className,
      )}
      method="POST"
      {...props}
      {...getFormProps(form)}
    >
      <FormItem>
        <Label htmlFor={fields.email.id}>
          <AtIcon size={20} weight="duotone" />
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
          <IdentificationBadgeIcon size={20} weight="duotone" />
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
          <TextboxIcon size={20} weight="duotone" />
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
          <PhoneTransferIcon size={20} weight="duotone" />
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
          <TextAlignLeftIcon size={20} weight="duotone" />
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
          icon={CheckCircleIcon}
          iconSize={20}
        >
          Thank you for your message! I will get back to you as soon as
          possible.
        </FormMessage>
      )}
      <Button className="col-span-full" disabled={isLoading} type="submit">
        {isLoading ? (
          <>
            Sending
            <CircleNotchIcon
              className="animate-spin"
              size={20}
              weight="duotone"
            />
          </>
        ) : (
          <>
            Submit
            <PaperPlaneTiltIcon size={20} weight="duotone" />
          </>
        )}
      </Button>
    </Form>
  );
}
