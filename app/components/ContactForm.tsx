import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
  type SubmissionResult,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useFetcher, type FormProps } from "react-router";
import { Label } from "./ui/label";
import {
  At,
  CircleNotch,
  IdentificationBadge,
  PaperPlaneTilt,
  PhoneTransfer,
  TextAlignLeft,
  Textbox,
  Warning,
} from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { cn } from "@/lib/utils";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const schema = z.object({
  email: z
    .string({
      required_error: "Your email is required.",
    })
    .email("Please enter a valid email address."),
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters.")
    .max(50, "Subject must be less than 50 characters.")
    .optional(),
  phone: z.string().regex(phoneRegex, "Invalid phone number!").optional(),
  message: z
    .string({
      required_error: "The message is required.",
    })
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be less than 500 characters."),
});

export default function ContactForm({
  lastResult,
  className,
  ...props
}: {
  lastResult: SubmissionResult<string[]> | null | undefined;
} & FormProps) {
  const { Form, state } = useFetcher({
    key: "contact-form",
  });
  const [form, fields] = useForm({
    // This not only syncs the error from the server
    // But is also used as the default value of the form
    // in case the document is reloaded for progressive enhancement
    lastResult,
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

  return (
    <Form
      {...getFormProps(form)}
      method="POST"
      className={cn(
        `inline-grid w-full grid-cols-1 gap-4 rounded-xl border bg-neutral-900
        p-4 offset-border @lg:grid-cols-2`,
        className,
      )}
      action="/?index"
      {...props}
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
        <FormError id={fields.email.errorId}>{fields.email.errors}</FormError>
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
        <FormError id={fields.name.errorId}>{fields.name.errors}</FormError>
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
        <FormError id={fields.subject.errorId}>
          {fields.subject.errors}
        </FormError>
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
        <FormError id={fields.phone.errorId}>{fields.phone.errors}</FormError>
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
        <FormError id={fields.message.errorId}>
          {fields.message.errors}
        </FormError>
      </FormItem>
      <Button className="@lg:col-span-2" type="submit" disabled={isLoading}>
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

export function FormError({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  if (!children) {
    return null;
  }
  return (
    <div
      className={cn("flex items-center gap-1 text-sm text-red-400", className)}
      {...props}
    >
      <Warning size={16} weight="duotone" />
      {children}
    </div>
  );
}

export function FormItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("group/form-item flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}
