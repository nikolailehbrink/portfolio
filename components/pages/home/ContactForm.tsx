"use client";

import ChatBubbleUser from "@/assets/icons/unicons/chat-bubble-user.svg";
import CommentAltLines from "@/assets/icons/unicons/comment-alt-lines.svg";
import EnvelopeHeart from "@/assets/icons/unicons/envelope-heart.svg";
import Message from "@/assets/icons/unicons/message.svg";
import MobileAndroid from "@/assets/icons/unicons/mobile-android.svg";
import Notebooks from "@/assets/icons/unicons/notebooks.svg";
import SpinnerAlt from "@/assets/icons/unicons/spinner-alt.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

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
    reset,
  } = form;

  async function onSubmit(values: formSchemaType) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { error } = (await response.json()) as {
        data: { id: string } | null;
        error: {
          statusCode: number;
          message: string;
          name: string;
        } | null;
      };
      if (error) {
        toast.error("Something went wrong! Please try again later.");
        return;
      }
      toast.success("Thank you for your message!");

      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 rounded-lg border-2 border-border
          bg-neutral-950 p-4 @container *:col-span-2 *:@sm:col-span-1 lg:p-8"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <ChatBubbleUser className="size-7" />
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
                <MobileAndroid className="size-7" />
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
                <EnvelopeHeart className="size-7" />
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
                <Notebooks className="size-7" />
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
                <CommentAltLines className="size-7" />
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
            <SpinnerAlt className="size-7 animate-spin" />
          ) : (
            <Message className="size-7" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
