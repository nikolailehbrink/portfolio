import { verifySignedToken } from "@/lib/token";
import { resend } from "@/lib/resend";
import type { APIRoute } from "astro";
import { RESEND_NEWSLETTER_AUDIENCE_ID } from "@/consts";

export const prerender = false;

export const GET: APIRoute = async ({ redirect, url }) => {
  const { searchParams } = url;
  const token = searchParams.get("token");

  if (!token) {
    throw new Error("No token provided");
  }

  const email = verifySignedToken(token);

  if (!email) {
    throw new Error("Wrong token");
  }

  try {
    // Check if the contact already exists
    const { data } = await resend.contacts.get({
      email,
      audienceId: RESEND_NEWSLETTER_AUDIENCE_ID,
    });

    if (data) {
      return redirect("/newsletter/confirmation?alreadySubscribed=true");
    }

    const { error } = await resend.contacts.create({
      email,
      audienceId: RESEND_NEWSLETTER_AUDIENCE_ID,
    });

    if (error) {
      console.error("Error adding contact:", error);
      throw new Error("Error adding contact");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Error verifying token");
  }
  return redirect("/newsletter/confirmation");
};
