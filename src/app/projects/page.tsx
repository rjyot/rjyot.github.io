import { Projects } from "@/components/projects";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("projects", "/projects/");

export default function ProjectsPage() {
  return (
    <main id="content">
      <Projects heading="h1" />
    </main>
  );
}
