import { useForm } from "@conform-to/react/future";
import { getInputProps, getTextareaProps } from "@conform-to/react";
import { Label } from "./ui/label";
import { AtIcon } from "@phosphor-icons/react/dist/ssr/At";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr/CircleNotch";
import { IdentificationBadgeIcon } from "@phosphor-icons/react/dist/ssr/IdentificationBadge";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr/PaperPlaneTilt";
import { PhoneTransferIcon } from "@phosphor-icons/react/dist/ssr/PhoneTransfer";
import { TextAlignLeftIcon } from "@phosphor-icons/react/dist/ssr/TextAlignLeft";
import { TextboxIcon } from "@phosphor-icons/react/dist/ssr/Textbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import FormMessage from "./FormMessage";
import FormItem from "./FormItem";
import { useActionState } from "react";
import { withState } from "@astrojs/react/actions";
import { actions } from "astro:actions";
import { contactFormSchema } from "@/lib/definitions";
import { getZodConstraint } from "@conform-to/zod/v4/future";

export default function ContactForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, action, isPending] = useActionState(
    withState(actions.contact),
    null,
  );
  const { form, fields } = useForm({
    // This not only syncs the error from the server
    // But is also used as the default value of the form
    // in case the document is reloaded for progressive enhancement
    lastResult: state?.data?.result,
    constraint: getZodConstraint(contactFormSchema),
    schema: contactFormSchema,
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
    id: "contact",
  });

  const sendSuccessfully = state?.data?.success;

  return (
    <form
      className={cn(
        `inline-grid w-full grid-cols-1 gap-4 rounded-xl border bg-neutral-900
        p-4 offset-border @lg:grid-cols-2`,
        className,
      )}
      {...props}
      {...form.props}
      action={action}
    >
      <FormItem>
        <Label htmlFor={fields.email.id}>
          <AtIcon weight="duotone" size={20} />
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
          <IdentificationBadgeIcon weight="duotone" size={20} />
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
          <TextboxIcon weight="duotone" size={20} />
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
          <PhoneTransferIcon weight="duotone" size={20} />
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
          <TextAlignLeftIcon weight="duotone" size={20} />
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
      <Button className="col-span-full" type="submit" disabled={isPending}>
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
            Submit
            <PaperPlaneTiltIcon weight="duotone" size={20} />
          </>
        )}
      </Button>
    </form>
  );
}
