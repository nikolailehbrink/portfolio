import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { href, useFetcher, useLocation, type FormProps } from "react-router";
import { Label } from "./ui/label";
import { CircleNotchIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import type { action } from "@/routes/index";
import FormMessage from "./FormMessage";
import FormItem from "./FormItem";

export const schema = z.object({
  email: z.email("Please enter a valid email address."),
});

export default function NewsletterForm({
  showText = true,
  className,
  ...props
}: FormProps & {
  showText?: boolean;
}) {
  const { pathname } = useLocation();
  const { Form, data, state } = useFetcher<typeof action>();
  const [form, fields] = useForm({
    lastResult: data,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    constraint: getZodConstraint(schema),
    shouldRevalidate: "onInput",
    id: `newsletter-signup-form-${pathname}`,
  });

  const isLoading = state !== "idle";

  const sendSuccessfully = data?.status === "success";

  return (
    <Form
      method="POST"
      className={cn(
        `not-prose inline-grid w-full grid-cols-1 gap-2 rounded-xl border
        bg-linear-to-b from-neutral-900 to-neutral-900 p-4 offset-border
        @lg:grid-cols-2`,
        className,
      )}
      action={href("/api/newsletter/signup")}
      {...props}
      {...getFormProps(form)}
    >
      {showText ? (
        <>
          <p className="text-lg font-bold text-foreground">
            A little note from me
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            I put a lot of effort into creating content that is informative,
            engaging, and useful for my readers. If you find it valuable, please
            consider subscribing to my newsletter.
          </p>
        </>
      ) : null}

      <div className="hidden">
        <label>
          Leave this field empty:
          <input type="text" name="company" autoComplete="off" />
        </label>
      </div>

      <FormItem>
        <Label className="sr-only" htmlFor={fields.email.id}>
          Email
        </Label>
        <div className="flex gap-2 max-sm:flex-col">
          <Input
            {...getInputProps(fields.email, { type: "email" })}
            placeholder="Enter your email"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Sending
                <CircleNotchIcon
                  className="animate-spin"
                  weight="duotone"
                  size={20}
                />
              </>
            ) : (
              <>
                Join newsletter
                <EnvelopeIcon weight="duotone" size={20} />
              </>
            )}
          </Button>
        </div>
        <FormMessage id={fields.email.errorId}>
          {fields.email.errors}
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
      {!isLoading && sendSuccessfully && (
        <FormMessage
          className="col-span-full items-start rounded-md border border-sky-900
            bg-sky-950 p-2 text-sky-400"
          icon={EnvelopeIcon}
          iconSize={20}
        >
          <p>
            <strong>Almost there!</strong> Look for a verification email in your
            inbox - and don’t forget to check your <i>spam folder</i>.
          </p>
        </FormMessage>
      )}
    </Form>
  );
}
