import ContactSection from "@/components/home/ContactSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HeaderAnimation from "@/components/home/HeaderAnimation";
import HeaderSection from "@/components/home/HeaderSection";
import ProjectSection from "@/components/home/ProjectSection";
import ServiceAnimation from "@/components/home/ServiceAnimation";
import ServiceSection from "@/components/home/ServiceSection";

export default function Page() {
  return (
    <>
      <HeaderAnimation>
        <HeaderSection />
      </HeaderAnimation>
      <ServiceAnimation>
        <ServiceSection />
      </ServiceAnimation>
      <ProjectSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
