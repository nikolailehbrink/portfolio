"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MessageSend from "@/public/icons/message-send.svg";
import Spinner from "@/public/icons/spinner.svg";
import ChatBubbleUser from "@/public/icons/chat-bubble-user.svg";
import MobileAndroid from "@/public/icons/mobile-android.svg";
import Email from "@/public/icons/email.svg";
import Notebooks from "@/public/icons/notebooks.svg";
import CommentAltLines from "@/public/icons/comment-alt-lines.svg";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional()
    .or(z.literal("")),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid Number!")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(2, {
      message: "Subject must be at least 2 characters.",
    })
    .max(50, {
      message: "Subject must be less than 50 characters.",
    })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(20, {
      message: "Message must be at least 20 characters.",
    })
    .max(500, {
      message: "Message must be less than 500 characters.",
    }),
});

export type formSchemaType = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    // reset,
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: formSchemaType) {
    // console.log(values);

    try {
      const data = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log({ data });

      // reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 rounded-lg border-2 border-border bg-neutral-950 p-4 @container *:col-span-2 *:@sm:col-span-1 lg:p-8"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <ChatBubbleUser className="w-7" />
                <FormLabel>Name</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <MobileAndroid className="w-7" />
                <FormLabel>Phone</FormLabel>
              </div>
              <FormControl>
                <Input type="tel" placeholder="+49123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <Email className="w-7" />
                <FormLabel>Email *</FormLabel>
              </div>
              <FormControl>
                <Input
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <Notebooks className="w-7" />
                <FormLabel>Subject</FormLabel>
              </div>
              <FormControl>
                <Input placeholder="What can I help with?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="message"
          render={({ field }) => (
            <FormItem className="@sm:!col-span-2">
              <div className="flex items-center gap-1">
                <CommentAltLines className="w-7" />
                <FormLabel>Message *</FormLabel>
              </div>
              <FormControl>
                <Textarea
                  required
                  placeholder="Type your message here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs @sm:!col-span-2">* Required</p>
        <Button
          className="self-start justify-self-start"
          size={"shadow"}
          type="submit"
        >
          {isSubmitting ? (
            <Spinner className="w-7 animate-spin" />
          ) : (
            <MessageSend className="w-7" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
