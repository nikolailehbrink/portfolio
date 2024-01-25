import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeaderSection from "@/components/home/HeaderSection";
import ProjectSection from "@/components/home/ProjectSection";
import ServiceSection from "@/components/home/ServiceSection";

export default function Page() {
  return (
    <>
      <HeaderSection />
      <ServiceSection />
      <ProjectSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
