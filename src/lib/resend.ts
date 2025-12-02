import { Resend } from "resend";

export const resend = new Resend(import.meta.env.RESEND_API_KEY);
