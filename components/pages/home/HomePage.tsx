import type { HomePagePayload } from "@/types/sanity";
import ContactSection from "./ContactSection";
import ExperienceSection from "./ExperienceSection";
import HeaderSection from "./HeaderSection";
import ProjectSection from "./ProjectSection";
import ServiceSection from "./ServiceSection";

export interface HomePageProps {
  data: HomePagePayload | null;
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { projects = [], services = [], experiences = [] } = data ?? {};

  return (
    <>
      <HeaderSection />
      <ServiceSection services={services} />
      <ProjectSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection />
    </>
  );
}

export default HomePage;
