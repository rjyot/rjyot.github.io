import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Now } from "@/components/now";
import { PageTransition } from "@/components/page-transition";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function HomePage() {
  return (
    <PageTransition>
      <main id="content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Now />
        <Contact />
      </main>
    </PageTransition>
  );
}
