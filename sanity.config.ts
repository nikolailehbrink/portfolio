"use client";

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { locate } from "@/sanity/plugins/locate";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import project from "@/sanity/schemas/documents/project";
import duration from "@/sanity/schemas/objects/duration";
import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import chat from "./sanity/schemas/documents/chat";
import experience from "./sanity/schemas/documents/experience";
import service from "./sanity/schemas/documents/service";
import blockContent from "./sanity/schemas/objects/blockContent";
import blog from "./sanity/schemas/singletons/blog";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Next.js Personal Website with Sanity.io";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      blog,
      // Documents
      duration,
      experience,
      service,
      post,
      author,
      project,
      chat,
      // Objects
      blockContent,
    ],
  },
  plugins: [
    codeInput(),
    structureTool({
      structure: pageStructure([blog], [experience, service, project]),
    }),
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: "/api/draft",
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([blog.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
