import { Now } from "@/components/now";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("now", "/now/");

export default function NowPage() {
  return (
    <main id="content">
      <Now heading="h1" />
    </main>
  );
}
