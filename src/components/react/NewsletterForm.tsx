import { getInputProps } from "@conform-to/react";
import { useForm } from "@conform-to/react/future";
import { getZodConstraint } from "@conform-to/zod/v4/future";
import { Label } from "./ui/label";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr/CircleNotch";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import FormMessage from "./FormMessage";
import FormItem from "./FormItem";
import { newsletterFormSchema } from "@/lib/definitions";
import { actions } from "astro:actions";
import { useActionState } from "react";
import { withState } from "@astrojs/react/actions";

export default function NewsletterForm({
  showText = true,
  className,
  ...props
}: React.ComponentProps<"form"> & {
  showText?: boolean;
}) {
  const [state, action, isPending] = useActionState(
    withState(actions.newsletter),
    null,
  );
  const { form, fields } = useForm({
    lastResult: state?.data?.result,
    constraint: getZodConstraint(newsletterFormSchema),
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
    schema: newsletterFormSchema,
  });

  const sendSuccessfully = state?.data?.success;

  return (
    <form
      method="POST"
      className={cn(
        `not-prose inline-grid w-full grid-cols-1 gap-2 rounded-xl border
        bg-linear-to-b from-neutral-900 to-neutral-900 p-4 offset-border
        @lg:grid-cols-2`,
        className,
      )}
      {...props}
      {...form.props}
      action={action}
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

      <div className="group/form-item hidden flex-col gap-2">
        <label>
          Company
          <input
            type="text"
            name="company"
            autoComplete="one-time-code"
            tabIndex={-1}
          />
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
          <Button type="submit" disabled={isPending}>
            {isPending ? (
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
      {sendSuccessfully && (
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
    </form>
  );
}
