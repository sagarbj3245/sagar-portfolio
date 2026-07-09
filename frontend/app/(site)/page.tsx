import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { ExperienceSection } from "@/components/experience";
import { ProjectsSection } from "@/components/projects";
import { Certificates } from "@/components/certificates";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
      <Certificates />
      <Contact />
    </>
  );
}
