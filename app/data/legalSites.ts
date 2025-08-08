import type { TypedRoute } from "@/types/href";

type LegalSite = {
  href: TypedRoute;
  name: string;
};

export const LEGAL_SITES = [
  {
    href: "/privacy-policy",
    name: "Privacy Policy",
  },
  {
    href: "/legal-notice",
    name: "Legal Notice",
  },
] as const satisfies LegalSite[];
