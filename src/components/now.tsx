import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Paragraph } from "@/components/text-value";
import { learning, patternStatusLabel, type PatternStatus } from "@/content/learning";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const statusClass: Record<PatternStatus, string> = {
  learning: "border-blue bg-panel",
  mastered: "border-amber bg-panel",
  not_started: "border-line bg-ink",
};

export function Now() {
  const { leetcode } = learning;

  return (
    <section id="now" className="bg-panel px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          title="Now"
          lede="LeetCode patterns, Levantine Arabic, the gym, and a daily GitHub streak."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <ArabicCard />
          </Reveal>
          {site.now.map((item) => (
            <Reveal key={item.id}>
              <article className="flex h-full flex-col border-t-4 border-blue bg-ink p-6">
                <div className="flex items-center gap-3">
                  <span className="now-dot" aria-hidden="true" />
                  <h3 className="font-display text-3xl font-extrabold tracking-tight">{item.title}</h3>
                </div>
                <Paragraph value={item.status} className="mt-5" />
                <Paragraph value={item.detail} className="mt-3 text-muted" />
                {item.id === "streak" ? (
                  <a
                    href={site.github}
                    className="mt-5 text-lg text-blue-bright underline underline-offset-4"
                  >
                    GitHub profile
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 border-t-4 border-blue bg-ink p-6">
          <h3 className="font-display text-3xl font-extrabold tracking-tight">LeetCode patterns</h3>
          <p className="mt-4 max-w-[40rem] text-lg">
            {leetcode.total} patterns. {leetcode.started} learning. {leetcode.mastered} mastered.{" "}
            {leetcode.cardsSeen} of {leetcode.cardsTotal} cards seen.
          </p>
          <p className="mt-2 max-w-[40rem] text-lg text-muted">{learning.masteredRule}</p>
          <ul className="mt-4 flex flex-wrap gap-3 text-lg">
            <li className="border border-blue px-3 py-1">Learning</li>
            <li className="border border-amber px-3 py-1">Mastered</li>
            <li className="border border-line px-3 py-1 text-muted">Not started</li>
          </ul>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {leetcode.patterns.map((pattern) => (
              <li
                key={pattern.number}
                className={cn("border-l-4 px-4 py-4", statusClass[pattern.status])}
              >
                <p className="text-lg font-semibold text-amber">
                  {String(pattern.number).padStart(2, "0")}
                </p>
                <p className="mt-1 text-lg leading-snug text-paper">{pattern.name}</p>
                <p className="mt-2 text-lg text-muted">{patternStatusLabel[pattern.status]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-lg text-muted">Anki snapshot {learning.snapshot}.</p>
        </div>
      </div>
    </section>
  );
}

function ArabicCard() {
  const words = learning.arabic.wordsOfTheDay;
  const word = words[0];
  const boot = `(function(){var words=${JSON.stringify(words)};var day=Math.floor(Date.now()/86400000);var word=words[((day%words.length)+words.length)%words.length];var node=document.querySelector("[data-arabic-script]");if(!node||!word)return;node.textContent=word.arabic;node.dir=word.dir;node.lang=word.lang;var spoken=document.querySelector("[data-arabic-spoken]");var meaning=document.querySelector("[data-arabic-meaning]");if(spoken)spoken.textContent=word.transliteration;if(meaning)meaning.textContent=word.english;})();`;

  return (
    <article className="flex h-full flex-col border-t-4 border-amber bg-ink p-6">
      <div className="flex items-center gap-3">
        <span className="now-dot" aria-hidden="true" />
        <h3 className="font-display text-3xl font-extrabold tracking-tight">Arabic</h3>
      </div>
      <p className="mt-4 text-lg text-paper">
        {learning.arabic.dialect}. {learning.arabic.dailyGoalMinutes} minutes a day.{" "}
        {learning.arabic.deckNotes} notes in the deck.
      </p>
      <p className="mt-6 text-lg font-semibold text-amber">Word of the day</p>
      <p
        dir={word.dir}
        lang={word.lang}
        data-arabic-script
        className="arabic-script mt-3 text-5xl font-semibold leading-tight text-paper md:text-6xl"
      >
        {word.arabic}
      </p>
      <p data-arabic-spoken className="mt-4 text-lg text-paper">
        {word.transliteration}
      </p>
      <p data-arabic-meaning className="mt-1 text-lg text-muted">
        {word.english}
      </p>
      <p className="mt-6 max-w-[36rem] text-lg text-amber">{learning.arabic.note}</p>
      <script dangerouslySetInnerHTML={{ __html: boot }} />
    </article>
  );
}
