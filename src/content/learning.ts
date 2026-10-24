/**
 * Learning snapshot from Ryan's Anki decks, 2026-10-24.
 * Arabic script was added for the site. The deck itself is transliteration only.
 * TODO(Ryan): glance over the Arabic before launch.
 *
 * The page shows pattern names, statuses, and the Arabic words.
 * Raw totals stay hidden unless `showCounts` is turned on.
 * Goal dates and study times are never rendered.
 */
export const learningConfig: { showCounts: boolean } = {
  showCounts: false,
};

export type PatternStatus = "not_started" | "learning" | "mastered";

export type LeetPattern = {
  number: number;
  name: string;
  status: PatternStatus;
};

export type ArabicWord = {
  transliteration: string;
  english: string;
  arabic: string;
  dir: "rtl";
  lang: "apc";
};

export const learning = {
  source: "Ryan's Anki decks (Flashcardmaster)",
  snapshot: "2026-10-24",
  masteredRule: "Mastered means every card in the pattern has a review interval of 21 days or more.",
  leetcode: {
    total: 21,
    mastered: 0,
    started: 1,
    cardsSeen: 1,
    cardsTotal: 190,
    patterns: [
      { number: 1, name: "Hashing & Counting", status: "learning" },
      { number: 2, name: "Simulation", status: "not_started" },
      { number: 3, name: "Matrix Traversal", status: "not_started" },
      { number: 4, name: "Greedy", status: "not_started" },
      { number: 5, name: "Practical Coding", status: "not_started" },
      { number: 6, name: "Two Pointers", status: "not_started" },
      { number: 7, name: "Sliding Window", status: "not_started" },
      { number: 8, name: "Prefix Sums", status: "not_started" },
      { number: 9, name: "Stack & Monotonic Stack", status: "not_started" },
      { number: 10, name: "Intervals", status: "not_started" },
      { number: 11, name: "Graphs: BFS & DFS", status: "not_started" },
      { number: 12, name: "Binary Search", status: "not_started" },
      { number: 13, name: "Linked Lists", status: "not_started" },
      { number: 14, name: "Trees: DFS & BFS", status: "not_started" },
      { number: 15, name: "Graphs: Topological Sort & Union-Find", status: "not_started" },
      { number: 16, name: "Heaps & Top-K", status: "not_started" },
      { number: 17, name: "Backtracking", status: "not_started" },
      { number: 18, name: "DP 1D", status: "not_started" },
      { number: 19, name: "DP 2D", status: "not_started" },
      { number: 20, name: "Knapsack", status: "not_started" },
      { number: 21, name: "Bit Tricks", status: "not_started" },
    ] satisfies LeetPattern[],
  },
  arabic: {
    dialect: "Levantine",
    deckNotes: 36,
    dailyGoalMinutes: 5,
    wordsOfTheDay: [
      { transliteration: "sabah el-kheir", english: "good morning", arabic: "صباح الخير", dir: "rtl", lang: "apc" },
      { transliteration: "sabah en-nur", english: "good morning (reply)", arabic: "صباح النور", dir: "rtl", lang: "apc" },
      { transliteration: "masa el-kheir", english: "good evening", arabic: "مسا الخير", dir: "rtl", lang: "apc" },
      { transliteration: "kif?", english: "how?", arabic: "كيف؟", dir: "rtl", lang: "apc" },
      { transliteration: "'addesh?", english: "how much?", arabic: "قديش؟", dir: "rtl", lang: "apc" },
      { transliteration: "'afwan", english: "you're welcome", arabic: "عفواً", dir: "rtl", lang: "apc" },
      { transliteration: "ma' as-salame", english: "goodbye", arabic: "مع السلامة", dir: "rtl", lang: "apc" },
    ] satisfies ArabicWord[],
    note: "TODO(Ryan): glance over before launch. Arabic script was added for the site. The deck itself is transliteration only.",
    /**
     * Activity dots stay hidden until a real Arabic row exists.
     * Do not back-fill days before 24 Oct 2026.
     */
    activity: null as boolean[] | null,
  },
} as const;

export const patternStatusLabel: Record<PatternStatus, string> = {
  not_started: "Not started",
  learning: "Learning",
  mastered: "Mastered",
};
