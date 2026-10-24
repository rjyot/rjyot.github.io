import { Contact } from "@/components/contact";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("contact", "/contact/");

export default function ContactPage() {
  return (
    <main id="content">
      <Contact heading="h1" />
    </main>
  );
}
