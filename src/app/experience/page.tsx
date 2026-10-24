import { Experience } from "@/components/experience";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("experience", "/experience/");

export default function ExperiencePage() {
  return (
    <main id="content">
      <Experience heading="h1" />
    </main>
  );
}
