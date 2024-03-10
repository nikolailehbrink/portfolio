import ToolGrid from "./ToolGrid";
import {
  HTML,
  CSS,
  JavaScript,
  TypeScript,
  TailwindCSS,
  React,
  Nextjs,
  Vite,
  Remix,
} from "@/assets/icons/tools/frontend";
import { Php, Nodejs, SqLite, Supabase } from "@/assets/icons/tools/backend";
import {
  Wordpress,
  WooCommerce,
  Shopware,
  Sanity,
} from "@/assets/icons/tools/cms-ecommerce";
import {
  Figma,
  AdobeXd,
  AfterEffects,
  Illustrator,
  Photoshop,
} from "@/assets/icons/tools/design";
import { Git, Github, Npm, VsCode, Copilot } from "@/assets/icons/tools/dev";

export default function ExpertiseGrid() {
  return (
    <div id="expertise-grid" className="flex flex-wrap gap-2">
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
