import type { BreadcrumbList, Person, WebSite, WithContext } from "schema-dts";
import avatar from "@/assets/avatar.webp";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import { SOCIAL_LINKS } from "@/data/socials";

// Stable anchors so every schema node can reference the same entity by `@id`
// instead of duplicating it. This is what lets Google (and LLMs) stitch the
// individual JSON-LD blocks into a single knowledge graph for the site.
const PERSON_ANCHOR = "/#person";
const WEBSITE_ANCHOR = "/#website";

const personId = (origin: string) => new URL(PERSON_ANCHOR, origin).href;
const websiteId = (origin: string) => new URL(WEBSITE_ANCHOR, origin).href;

/** Reusable `@id` reference to the site owner. */
export const personRef = (origin: string) => ({ "@id": personId(origin) });
/** Reusable `@id` reference to the website entity. */
export const websiteRef = (origin: string) => ({ "@id": websiteId(origin) });

export function personSchema(origin: string): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(origin),
    name: SITE_TITLE,
    url: new URL("/", origin).href,
    image: new URL(avatar.src, origin).href,
    description: SITE_DESCRIPTION,
    jobTitle: "Full Stack Developer",
    sameAs: SOCIAL_LINKS.map(({ href }) => href),
    knowsAbout: [
      "Web Development",
      "Frontend Engineering",
      "Full Stack Development",
      "React",
      "Astro",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Inquiries",
      email: "mail@nikolailehbr.ink",
    },
  };
}

export function websiteSchema(origin: string): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(origin),
    url: new URL("/", origin).href,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: personRef(origin),
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbSchema(
  origin: string,
  crumbs: Array<Crumb>,
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(url, origin).href,
    })),
  };
}
