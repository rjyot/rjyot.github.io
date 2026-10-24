import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Now } from "@/components/now";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Now />
      <Contact />
    </main>
  );
}
