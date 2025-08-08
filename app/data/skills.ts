import Copilot from "@/assets/svg/copilot.svg?react";
import CreativeCloud from "@/assets/svg/creative-cloud.svg?react";
import CSS from "@/assets/svg/css.svg?react";
import Deno from "@/assets/svg/deno.svg?react";
import Figma from "@/assets/svg/figma.svg?react";
import GitHub from "@/assets/svg/github.svg?react";
import HTML from "@/assets/svg/html.svg?react";
import JavaScript from "@/assets/svg/javascript.svg?react";
import Nextjs from "@/assets/svg/nextjs.svg?react";
import NodeJS from "@/assets/svg/nodejs.svg?react";
import Payload from "@/assets/svg/payload.svg?react";
import PHP from "@/assets/svg/php.svg?react";
import ReactRouter from "@/assets/svg/react-router.svg?react";
import React from "@/assets/svg/react.svg?react";
import Remix from "@/assets/svg/remix.svg?react";
import Sanity from "@/assets/svg/sanity.svg?react";
import TailwindCSS from "@/assets/svg/tailwindcss.svg?react";
import TypeScript from "@/assets/svg/typescript.svg?react";
import VisualStudioCode from "@/assets/svg/visual-studio-code.svg?react";
import Vite from "@/assets/svg/vite.svg?react";
import Wordpress from "@/assets/svg/wordpress.svg?react";

type Skill = {
  logo: React.FunctionComponent<
    React.ComponentProps<"svg"> & {
      desc?: string;
      descId?: string;
      title?: string;
      titleId?: string;
    }
  >;
  name: string;
  url: string;
};

export const SKILLS = {
  Backend: [
    {
      logo: NodeJS,
      name: "Node.js",
      url: "https://nodejs.org",
    },
    {
      logo: Deno,
      name: "Deno",
      url: "https://deno.land",
    },
    {
      logo: PHP,
      name: "PHP",
      url: "https://www.php.net",
    },
  ],
  CMS: [
    {
      logo: Wordpress,
      name: "WordPress",
      url: "https://wordpress.org",
    },
    {
      logo: Payload,
      name: "Payload",
      url: "https://payloadcms.com",
    },
    {
      logo: Sanity,
      name: "Sanity",
      url: "https://www.sanity.io",
    },
  ],
  Design: [
    {
      logo: Figma,
      name: "Figma",
      url: "https://www.figma.com",
    },
    {
      logo: CreativeCloud,
      name: "Creative Cloud",
      url: "https://www.adobe.com/creativecloud.html",
    },
  ],
  Frontend: [
    {
      logo: HTML,
      name: "HTML",
      url: "https://developer.mozilla.org/de/docs/Web/HTML",
    },
    {
      logo: CSS,
      name: "CSS",
      url: "https://developer.mozilla.org/de/docs/Web/CSS",
    },
    {
      logo: JavaScript,
      name: "JavaScript",
      url: "https://developer.mozilla.org/de/docs/Web/JavaScript",
    },
    {
      logo: TypeScript,
      name: "TypeScript",
      url: "https://www.typescriptlang.org",
    },
    {
      logo: TailwindCSS,
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
    },
    {
      logo: React,
      name: "React",
      url: "https://react.dev",
    },
    {
      logo: ReactRouter,
      name: "React Router",
      url: "https://reactrouter.com",
    },
    {
      logo: Remix,
      name: "Remix",
      url: "https://remix.run",
    },
    {
      logo: Nextjs,
      name: "Next.js",
      url: "https://nextjs.org",
    },
  ],
  Tools: [
    {
      logo: VisualStudioCode,
      name: "VS Code",
      url: "https://code.visualstudio.com",
    },
    {
      logo: Vite,
      name: "Vite",
      url: "https://vite.dev",
    },
    {
      logo: Copilot,
      name: "GitHub Copilot",
      url: "https://github.com/features/copilot",
    },
    {
      logo: GitHub,
      name: "GitHub",
      url: "https://github.com",
    },
  ],
} as const satisfies { [key: string]: Skill[] };
