import type { TypedRoute } from "@/types/href";

export const LEGAL_SITES = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Legal Notice",
    href: "/legal-notice",
  },
] as const satisfies {
  name: string;
  href: TypedRoute;
}[];
