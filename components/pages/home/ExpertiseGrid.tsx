import { Nodejs, Php, SqLite, Supabase } from "@/assets/icons/tools/backend";
import {
  Sanity,
  Shopware,
  WooCommerce,
  Wordpress,
} from "@/assets/icons/tools/cms-ecommerce";
import {
  AdobeXd,
  AfterEffects,
  Figma,
  Illustrator,
  Photoshop,
} from "@/assets/icons/tools/design";
import { Copilot, Git, Github, Npm, VsCode } from "@/assets/icons/tools/dev";
import {
  CSS,
  HTML,
  JavaScript,
  Nextjs,
  React,
  Remix,
  TailwindCSS,
  TypeScript,
  Vite,
} from "@/assets/icons/tools/frontend";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import ToolGrid from "./ToolGrid";

export default function ExpertiseGrid() {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  useGSAP(() => {
    gsap.from(q("svg"), {
      fill: "#FFF",
      fillOpacity: 0.3,
      backgroundImage: "none",
      stagger: 0.5,
      duration: 0.5,
      scrollTrigger: {
        scrub: 1,
        trigger: ref.current,
        end: "bottom 15%",
        start: "top 85%",
        toggleActions: "restart none restart none",
      },
    });
  });
  return (
    <div ref={ref} className="tool-grid flex flex-wrap gap-2">
      <ToolGrid sector="Front-End Development">
        <HTML />
        <CSS />
        <JavaScript />
        <TypeScript />
        <TailwindCSS />
        <React />
        <Vite />
        <Remix />
        <Nextjs />
      </ToolGrid>

      <ToolGrid sector="Back-End Development">
        <Php />
        <Nodejs />
        <SqLite />
        <Supabase />
      </ToolGrid>

      <ToolGrid sector="CMS & E-Commerce">
        <Wordpress />
        <WooCommerce />
        <Shopware />
        <Sanity />
      </ToolGrid>

      <ToolGrid sector="Design & Animation">
        <Figma />
        <AdobeXd />
        <AfterEffects />
        <Illustrator />
        <Photoshop />
      </ToolGrid>

      <ToolGrid sector="Dev Tools">
        <Git />
        <Github />
        <Npm />
        <VsCode />
        <Copilot />
      </ToolGrid>
    </div>
  );
}
