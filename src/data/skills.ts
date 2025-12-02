import CreativeCloud from "@/assets/skills/creative-cloud.svg";
import Deno from "@/assets/skills/deno.svg";
import Figma from "@/assets/skills/figma.svg";
import JavaScript from "@/assets/skills/javascript.svg";
import NodeJS from "@/assets/skills/nodejs.svg";
import ReactRouter from "@/assets/skills/react-router.svg";
import TailwindCSS from "@/assets/skills/tailwindcss.svg";
import TypeScript from "@/assets/skills/typescript.svg";
import VisualStudioCode from "@/assets/skills/visual-studio-code.svg";
import Vite from "@/assets/skills/vite.svg";
import Copilot from "@/assets/skills/copilot.svg";
import CSS from "@/assets/skills/css.svg";
import HTML from "@/assets/skills/html.svg";
import React from "@/assets/skills/react.svg";
import GitHub from "@/assets/skills/github.svg";
import Nextjs from "@/assets/skills/nextjs.svg";
import Remix from "@/assets/skills/remix.svg";
import PHP from "@/assets/skills/php.svg";
import Payload from "@/assets/skills/payload.svg";
import Sanity from "@/assets/skills/sanity.svg";
import Wordpress from "@/assets/skills/wordpress.svg";

export const SKILLS = {
  Frontend: [
    {
      name: "HTML",
      logo: HTML,
      url: "https://developer.mozilla.org/de/docs/Web/HTML",
    },
    {
      name: "CSS",
      logo: CSS,
      url: "https://developer.mozilla.org/de/docs/Web/CSS",
    },
    {
      name: "JavaScript",
      logo: JavaScript,
      url: "https://developer.mozilla.org/de/docs/Web/JavaScript",
    },
    {
      name: "TypeScript",
      logo: TypeScript,
      url: "https://www.typescriptlang.org",
    },
    {
      name: "Tailwind CSS",
      logo: TailwindCSS,
      url: "https://tailwindcss.com",
    },
    {
      name: "React",
      logo: React,
      url: "https://react.dev",
    },
    {
      name: "React Router",
      logo: ReactRouter,
      url: "https://reactrouter.com",
    },
    {
      name: "Remix",
      logo: Remix,
      url: "https://remix.run",
    },
    {
      name: "Next.js",
      logo: Nextjs,
      url: "https://nextjs.org",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      logo: NodeJS,
      url: "https://nodejs.org",
    },
    {
      name: "Deno",
      logo: Deno,
      url: "https://deno.land",
    },
    {
      name: "PHP",
      logo: PHP,
      url: "https://www.php.net",
    },
  ],
  Design: [
    {
      name: "Figma",
      logo: Figma,
      url: "https://www.figma.com",
    },
    {
      name: "Creative Cloud",
      logo: CreativeCloud,
      url: "https://www.adobe.com/creativecloud.html",
    },
  ],
  CMS: [
    {
      name: "WordPress",
      logo: Wordpress,
      url: "https://wordpress.org",
    },
    {
      name: "Payload",
      logo: Payload,
      url: "https://payloadcms.com",
    },
    {
      name: "Sanity",
      logo: Sanity,
      url: "https://www.sanity.io",
    },
  ],
  Tools: [
    {
      name: "VS Code",
      logo: VisualStudioCode,
      url: "https://code.visualstudio.com",
    },
    {
      name: "Vite",
      logo: Vite,
      url: "https://vite.dev",
    },
    {
      name: "GitHub Copilot",
      logo: Copilot,
      url: "https://github.com/features/copilot",
    },
    {
      name: "GitHub",
      logo: GitHub,
      url: "https://github.com",
    },
  ],
} as const;
