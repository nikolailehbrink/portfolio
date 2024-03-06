import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import HomeAnimation from "./components/HomeAnimation";
import HeaderSection from "./components/HeaderSection";
import ProjectSection from "./components/ProjectSection";
import ServiceSection from "./components/ServiceSection";

export default function Page() {
  return (
    <>
      <HomeAnimation>
        <HeaderSection />
        <ServiceSection />
        <ProjectSection />
        <ExperienceSection />
        <ContactSection />
      </HomeAnimation>
    </>
  );
}
