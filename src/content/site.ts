/**
 * SITE CONTENT
 * ------------
 * All public copy lives in this file. Search for "PLACEHOLDER" and replace
 * those strings. Do not guess employers, grades, awards, dates, or metrics.
 *
 * Filled-in facts are from Ryan Jyothis's public GitHub profile README
 * (https://github.com/rjyot/rjyot), read 2026-10-24, and from the Brewstige
 * brief: an Expo / React Native café app.
 *
 * Repos other than the profile https://github.com/rjyot are private.
 * Do not put a repository URL on a project page.
 *
 * Do not write a degree title (MEng, BEng) or a graduation year.
 * Study line: Software Engineering, Queen's University Belfast (2024–present).
 */

export type Project = {
  slug: string;
  name: string;
  summary: string;
  context: string;
  stack: string[];
  /** Personal part in the work. Use a TODO(Ryan) string until it is confirmed. */
  contribution: string | null;
  href: string | null;
  year: string;
  /** True when the card is an open slot, not a shipped project. */
  placeholder: boolean;
};

export type TimelineItem = {
  id: string;
  kind: "work" | "education";
  org: string;
  /** Job title. Null when the title is unconfirmed and must stay off the page. */
  title: string | null;
  dates: string;
  location: string;
  summary: string;
  href: string | null;
};

export type Award = {
  id: string;
  event: string;
  result: string;
  detail: string;
  when: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type NowItem = {
  id: string;
  title: string;
  status: string;
  detail: string;
};

export type Fact = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type ContactLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return value.trim().toUpperCase().startsWith("PLACEHOLDER");
}

/** Profile URL only. A GitHub path with owner and repo is a repository, and those stay unlinked. */
export function publicProjectHref(href: string | null): string | null {
  if (!href) return null;
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    const parts = url.pathname.split("/").filter(Boolean);
    if (host === "github.com" && parts.length >= 2) return null;
    return href;
  } catch {
    return null;
  }
}

export const site = {
  name: "Ryan Jyothis",
  firstName: "Ryan",
  lastName: "Jyothis",
  role: "Software Engineering student",
  tagline: "I build apps. I break them too.",
  study: "Software Engineering, Queen's University Belfast (2024–present).",
  location: "Belfast, Northern Ireland",
  availability: "Summer 2027 internships, from July 2027",
  github: "https://github.com/rjyot",
  githubHandle: "rjyot",
  /**
   * CV PDF is not in the repo. Leave null until a real file path exists.
   * The hero shows `cvNote` and does not link a missing file.
   */
  cvHref: null as string | null,
  cvNote: "TODO(Ryan)",
  /**
   * Email is not on the public profile. Leave null until a real address exists.
   * The contact section renders `emailPlaceholder` and does not invent a link.
   */
  email: null as string | null,
  emailPlaceholder: "PLACEHOLDER: email address",
  emailNote: "TODO(Ryan)",
  /** A real photo can sit under the hero field. Leave null until the file exists. */
  skyline: null as string | null,
  skylineNote: "TODO(Ryan): a Belfast skyline photo under this field.",
  about: [
    "The space between an idea and a usable product.",
    "I built Brewstige, a loyalty app for small cafés that points you to the quieter ones.",
    "A lot of that starts at hackathons, including Hack Belfast.",
    "Off the screen I lift, play football and volleyball, and learn Arabic.",
  ],
  /**
   * Stats strip. Only sourced lines belong here.
   * Off the strip until Ryan confirms them: Brewstige team size, a 75 kg goal,
   * a GitHub streak length, a Citi job title, and "lives in Belfast".
   */
  facts: [
    {
      id: "study",
      label: "Study",
      value: "Software Engineering",
      hint: "Queen's University Belfast",
    },
    {
      id: "open",
      label: "Seeking",
      value: "Summer 2027",
      hint: "Internships in the UK and Ireland",
    },
    {
      id: "github-goal",
      label: "GitHub goal",
      value: "Every day",
      hint: "A contribution a day until 31 Dec 2026",
    },
    {
      id: "session",
      label: "One session",
      value: "5,190 kg",
      hint: "57 min, 20 Oct 2026",
    },
    {
      id: "gym",
      label: "Gym",
      value: "3 days a week",
      hint: "Tue, Thu, Sun",
    },
    {
      id: "football",
      label: "Football",
      value: "Twice a week",
      hint: "Mon, Wed",
    },
    {
      id: "arabic",
      label: "Arabic",
      value: "5 minutes a day",
      hint: "Anki",
    },
    {
      id: "agents",
      label: "Second brain",
      value: "4 agents",
      hint: "Extractor, Librarian, Recall, Follow-Up",
    },
    {
      id: "reels",
      label: "Reels filed",
      value: "About 30",
      hint: "Notion library, since early Oct 2026",
    },
  ] satisfies Fact[],
  projects: [
    {
      slug: "brewstige",
      name: "Brewstige",
      summary: "A loyalty app for small cafés that points you to quieter ones.",
      contribution: "TODO(Ryan): what you built on Brewstige, in one or two lines.",
      context: "Hack Belfast, a 24-hour hackathon. Runner-up for Best Real World Impact.",
      stack: ["Expo", "React Native"],
      href: null,
      year: "PLACEHOLDER: year",
      placeholder: false,
    },
    {
      slug: "zeto",
      name: "Zeto",
      summary: "PLACEHOLDER: one sentence on what Zeto does.",
      contribution: null,
      context:
        "Notion × Dublin AI Week Student Hackathon, October 2026. Participant. Private TypeScript repository.",
      stack: ["TypeScript"],
      href: null,
      year: "2026",
      placeholder: false,
    },
    {
      slug: "next",
      name: "PLACEHOLDER",
      summary: "PLACEHOLDER: one sentence on a project to add.",
      contribution: null,
      context: "PLACEHOLDER: where it came from, in one short line.",
      stack: ["PLACEHOLDER: stack"],
      href: null,
      year: "PLACEHOLDER: year",
      placeholder: true,
    },
  ] satisfies Project[],
  timeline: [
    {
      id: "citi",
      kind: "work",
      org: "Citi",
      title: null,
      dates: "PLACEHOLDER: start and end dates",
      location: "PLACEHOLDER: office location",
      summary: "TODO(Ryan): what to say about this placement. Do not guess the work or a job title.",
      href: "https://www.citi.com",
    },
    {
      id: "qub",
      kind: "education",
      org: "Queen's University Belfast",
      title: "Software Engineering",
      dates: "2024–present",
      location: "Belfast, Northern Ireland",
      summary: "Software Engineering, Queen's University Belfast (2024–present).",
      href: "https://www.qub.ac.uk",
    },
  ] satisfies TimelineItem[],
  awards: [
    {
      id: "hack-belfast",
      event: "Hack Belfast",
      result: "Runner-up, Best Real World Impact",
      detail: "24-hour hackathon. The project was Brewstige.",
      when: "PLACEHOLDER: year",
    },
    {
      id: "dublin",
      event: "Notion × Dublin AI Week Student Hackathon",
      result: "Participant",
      detail: "Built Zeto. October 2026. Private TypeScript repository.",
      when: "October 2026",
    },
  ] satisfies Award[],
  skills: [
    { id: "language", label: "Language", items: ["TypeScript"] },
    { id: "frontend", label: "Frontend", items: ["React", "React Native"] },
    {
      id: "mobile",
      label: "Mobile",
      items: ["Expo", "Expo Router", "NativeWind", "Android"],
    },
    { id: "backend", label: "Backend", items: ["Supabase"] },
    { id: "database", label: "Database", items: ["PostgreSQL"] },
    { id: "maps", label: "Maps", items: ["MapLibre"] },
  ] satisfies SkillGroup[],
  now: [
    {
      id: "gym",
      title: "Gym",
      status: "5,190 kg in one session, 57 minutes, 20 Oct 2026.",
      detail: "Three days a week: Tue, Thu, and Sun.",
    },
    {
      id: "github-goal",
      title: "GitHub",
      status: "A contribution every day until 31 Dec 2026.",
      detail: "A goal, not a streak count.",
    },
  ] satisfies NowItem[],
  contact: [
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "Ryan Jyothis",
      href: "https://www.linkedin.com/in/ryanjyothis/",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "ryanjyothis",
      href: "https://www.instagram.com/ryanjyothis/",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "rjyot",
      href: "https://github.com/rjyot",
    },
  ] satisfies ContactLink[],
  contactNote:
    "Hiring for summer 2027 internships from July 2027, in the UK or Ireland? LinkedIn, Instagram, or GitHub.",
};

/**
 * Current GitHub streak. Leave null unless a live read of rjyot's contribution
 * data sets `days` and `asOf`. Do not type a number in by hand.
 */
export const githubStreak: { days: number; asOf: string } | null = null;

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "now", label: "Now" },
  { id: "contact", label: "Contact" },
] as const;

export function getProject(slug: string): Project | undefined {
  return site.projects.find((project) => project.slug === slug);
}
