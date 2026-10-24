import { About } from "@/components/about";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("about", "/about/");

export default function AboutPage() {
  return (
    <main id="content">
      <About heading="h1" />
    </main>
  );
}
