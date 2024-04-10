import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Link from "next/link";

import { ProjectListItem } from "@/components/pages/home/ProjectListItem";
import { Header } from "@/components/shared/Header";
import { resolveHref } from "@/sanity/lib/utils";
import type { HomePagePayload } from "@/types/sanity";

import ContactSection from "./ContactSection";
import ExperienceSection from "./ExperienceSection";
import HeaderSection from "./HeaderSection";
import ProjectSection from "./ProjectSection";
import ServiceSection from "./ServiceSection";

export interface HomePageProps {
  data: HomePagePayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { home, projects = [], services = [], experiences = [] } = data ?? {};

  return (
    <>
      <HeaderSection />
      <ServiceSection services={services} />
      <ProjectSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection />

      {/* Showcase projects */}
      {/* {projects && projects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {projects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug);
            if (!href) {
              return null;
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  "showcaseProjects",
                  key,
                  "slug",
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            );
          })}
        </div>
      )} */}
    </>
  );
}

export default HomePage;
