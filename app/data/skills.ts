import CreativeCloud from "@/assets/svg/creative-cloud.svg?react";
import Deno from "@/assets/svg/deno.svg?react";
import Figma from "@/assets/svg/figma.svg?react";
import JavaScript from "@/assets/svg/javascript.svg?react";
import NodeJS from "@/assets/svg/nodejs.svg?react";
import ReactRouter from "@/assets/svg/react-router.svg?react";
import TailwindCSS from "@/assets/svg/tailwindcss.svg?react";
import TypeScript from "@/assets/svg/typescript.svg?react";
import VisualStudioCode from "@/assets/svg/visual-studio-code.svg?react";
import Vite from "@/assets/svg/vite.svg?react";
import Copilot from "@/assets/svg/copilot.svg?react";
import CSS from "@/assets/svg/css.svg?react";
import HTML from "@/assets/svg/html.svg?react";
import React from "@/assets/svg/react.svg?react";
import GitHub from "@/assets/svg/github.svg?react";
import Nextjs from "@/assets/svg/nextjs.svg?react";
import Remix from "@/assets/svg/remix.svg?react";
import PHP from "@/assets/svg/php.svg?react";
import Payload from "@/assets/svg/payload.svg?react";
import Sanity from "@/assets/svg/sanity.svg?react";
import Wordpress from "@/assets/svg/wordpress.svg?react";

export const SKILLS = {
  Frontend: [
    {
      name: "HTML",
      icon: HTML,
      url: "https://developer.mozilla.org/de/docs/Web/HTML",
    },
    {
      name: "CSS",
      icon: CSS,
      url: "https://developer.mozilla.org/de/docs/Web/CSS",
    },
    {
      name: "JavaScript",
      icon: JavaScript,
      url: "https://developer.mozilla.org/de/docs/Web/JavaScript",
    },
    {
      name: "TypeScript",
      icon: TypeScript,
      url: "https://www.typescriptlang.org",
    },
    {
      name: "Tailwind CSS",
      icon: TailwindCSS,
      url: "https://tailwindcss.com",
    },
    {
      name: "React",
      icon: React,
      url: "https://react.dev",
    },
    {
      name: "React Router",
      icon: ReactRouter,
      url: "https://reactrouter.com",
    },
    {
      name: "Remix",
      icon: Remix,
      url: "https://remix.run",
    },
    {
      name: "Next.js",
      icon: Nextjs,
      url: "https://nextjs.org",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      icon: NodeJS,
      url: "https://nodejs.org",
    },
    {
      name: "Deno",
      icon: Deno,
      url: "https://deno.land",
    },
    {
      name: "PHP",
      icon: PHP,
      url: "https://www.php.net",
    },
  ],
  Design: [
    {
      name: "Figma",
      icon: Figma,
      url: "https://www.figma.com",
    },
    {
      name: "Creative Cloud",
      icon: CreativeCloud,
      url: "https://www.adobe.com/creativecloud.html",
    },
  ],
  CMS: [
    {
      name: "WordPress",
      icon: Wordpress,
      url: "https://wordpress.org",
    },
    {
      name: "Payload",
      icon: Payload,
      url: "https://payloadcms.com",
    },
    {
      name: "Sanity",
      icon: Sanity,
      url: "https://www.sanity.io",
    },
  ],
  Tools: [
    {
      name: "VS Code",
      icon: VisualStudioCode,
      url: "https://code.visualstudio.com",
    },
    {
      name: "Vite",
      icon: Vite,
      url: "https://vite.dev",
    },
    {
      name: "GitHub Copilot",
      icon: Copilot,
      url: "https://github.com/features/copilot",
    },
    {
      name: "GitHub",
      icon: GitHub,
      url: "https://github.com",
    },
  ],
} as const satisfies {
  [key: string]: {
    name: string;
    icon: React.FunctionComponent<
      React.ComponentProps<"svg"> & {
        title?: string;
        titleId?: string;
        desc?: string;
        descId?: string;
      }
    >;
    url: string;
  }[];
};
