import type { TypedRoute } from "@/types/href";

type LegalSite = {
  name: string;
  href: TypedRoute;
};

export const LEGAL_SITES = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Legal Notice",
    href: "/legal-notice",
  },
] as const satisfies LegalSite[];
