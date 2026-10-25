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

import { fitnessConfig } from "@/content/fitness";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  context: string;
  stack: string[];
  /** Personal part in the work. Use a TODO(Ryan) string until it is confirmed. */
  contribution: string | null;
  /** A follow-up note, usually a TODO(Ryan) line. */
  contributionNote: string | null;
  href: string | null;
  year: string;
  /** Short label above the description, such as the hackathon name. */
  label?: string;
  /** Date and place for the case note only. The card does not repeat it. */
  held?: string;
  /** Case-note bullets. Plain words. */
  points?: string[];
  /** True when the card is an open slot, not a shipped project. */
  placeholder: boolean;
  /** Set only when a real app screenshot is still missing. */
  screenshotNote: string | null;
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
  /** Hidden while `reviewConfig.showPersonalStats` is off. */
  personal?: boolean;
};

export function isPublicProject(project: { slug: string; placeholder: boolean }) {
  if (project.placeholder) return false;
  if (project.slug === "zeto" && !reviewConfig.showBuiltZeto) return false;
  return true;
}

/**
 * Café claims and the Hack Belfast runner-up line stay off until Ryan confirms them.
 */
export const brewstigeConfig = {
  showCafeClaims: false,
  showRealWorldImpact: false,
};

/** Recruiter-facing switches. Personal stats stay off. Zeto is on. */
export const reviewConfig = {
  showPersonalStats: false,
  showBuiltZeto: true,
};

const brewstigeCafeClaims =
  "During the same 36 hours I talked to 13 Belfast café owners and came away with a letter of interest and a paying client.";

const brewstigeWork =
  "Since then I've worked on getting the mobile app release-ready. My part is the Supabase least-privilege hardening, Apple sign-in, and the Android camera fix: I tightened Supabase permissions to least privilege, hid Apple sign-in until it's set up, and fixed the Android camera permission so QR scanning works (KAN-23). I brought the app onto its Expo SDK 57 baseline with a single required CI check, and got expo-doctor passing. I also removed the old web MVP, stopped featured stickers leaking between accounts on a shared phone, and wrote the café go-live content standard.";

function brewstigeContribution() {
  const lead = "I co-founded Brewstige and led the frontend at HackBelfast 2026.";
  if (!brewstigeConfig.showCafeClaims) return `${lead} ${brewstigeWork}`;
  return `${lead} ${brewstigeCafeClaims} ${brewstigeWork}`;
}

function brewstigeContext() {
  const base = "With two collaborators. Hack Belfast, a 36-hour hackathon.";
  if (!brewstigeConfig.showRealWorldImpact) return base;
  return `${base} Runner-up for Best Real World Impact.`;
}

function hackAwardResult() {
  if (brewstigeConfig.showRealWorldImpact) return "Runner-up, Best Real World Impact";
  return "TODO(Ryan): Best Real World Impact, runner-up";
}

/**
 * Zeto did not place. No award card, no placing, and no teammates.
 * The project card is the public mention.
 */
function dublinAwardDetail() {
  return "";
}

function brewstigeContributionNote() {
  const camera =
    "TODO(Ryan): confirm the wording, and whether the camera fix is tested on a real Android phone.";
  if (brewstigeConfig.showCafeClaims) return camera;
  return `TODO(Ryan): the café-owner count, letter of interest, and paying client are not confirmed. ${camera}`;
}

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
  /** First screen. No degree title and no year. */
  who: "Software Engineering student, Queen's University Belfast",
  location: "Belfast, Northern Ireland",
  availability: "Summer 2027 internships from July 2027, UK and Ireland",
  /** Neutral role line. No job title, and do not say production. */
  citiLine: "Software engineering placement, Citi",
  proof: brewstigeConfig.showRealWorldImpact
    ? "Brewstige, Hack Belfast runner-up for Best Real World Impact."
    : "Brewstige, from a 36-hour hackathon.",
  /** Shown in dev while the runner-up line is flagged off. */
  proofTodo: brewstigeConfig.showRealWorldImpact
    ? null
    : "TODO(Ryan): Best Real World Impact, runner-up",
  updatedLabel: "Last updated 24 Oct 2026",
  github: "https://github.com/rjyot",
  githubHandle: "rjyot",
  /**
   * Absolute origin for canonical and social links.
   * Change this when the public host is different.
   */
  origin: "https://rjyot.github.io",
  /**
   * Ryan has two CVs and has not picked one. Do not link a PDF.
   * The public page is /cv/.
   */
  cvHref: null as string | null,
  cvNote: "TODO(Ryan): which CV to publish",
  /**
   * Email is not on the public profile. Leave null until a real address exists.
   * Until then the hero link keeps `emailNote` and goes to the contact section.
   * The contact section renders `emailPlaceholder` and does not invent an address.
   */
  email: null as string | null,
  emailPlaceholder: "PLACEHOLDER: email address",
  emailNote: "TODO(Ryan)",
  about: [
    "The space between an idea and a usable product is where I like to work.",
    "I'm Ryan, a Software Engineering student at Queen's University Belfast.",
    "I co-founded Brewstige and led the frontend, a loyalty app for small cafés that points you to quieter ones.",
    fitnessConfig.showFootball
      ? "Outside code, I lift, play football, and learn Arabic."
      : "Outside code, I lift and learn Arabic.",
    "I'm after a software engineering internship from July 2027.",
  ],
  /** 27-word About, used as the meta description. */
  description:
    "The space between an idea and a usable product is where I like to work. Software Engineering at Queen's, Belfast. Open to internships from July 2027.",
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
      hint: "20 Oct 2026",
      personal: true,
    },
    {
      id: "gym",
      label: "Gym",
      value: fitnessConfig.showSessionCount ? "4 sessions" : "TODO(Ryan)",
      hint: fitnessConfig.showSessionCount ? "October" : "Session count",
    },
    {
      id: "football",
      label: "Football",
      value: fitnessConfig.showFootball ? "Twice a week" : "TODO(Ryan)",
      hint: fitnessConfig.showFootball ? "Playing" : "Not confirmed",
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
      personal: true,
    },
    {
      id: "reels",
      label: "Reels filed",
      value: "About 30",
      hint: "Notion library, since early Oct 2026",
      personal: true,
    },
  ] satisfies Fact[],
  projects: [
    {
      slug: "brewstige",
      name: "Brewstige",
      summary: "A loyalty app for small cafés that points you to quieter ones.",
      contribution: brewstigeContribution(),
      contributionNote: brewstigeContributionNote(),
      context: brewstigeContext(),
      stack: ["Expo", "React Native"],
      href: null,
      year: "PLACEHOLDER: year",
      placeholder: false,
      screenshotNote: "TODO(Ryan): app screenshot",
    },
    {
      slug: "zeto",
      name: "Zeto",
      label: "Notion Loves Dublin × Dublin AI Week Student Hackathon, TU Dublin",
      held: "9 Oct 2026, TU Dublin, Grangegorman.",
      summary:
        "An internship tracker and application workspace for students and graduates across the UK and Ireland.",
      contribution: null,
      contributionNote: null,
      context: "Built at the hackathon. Being developed further.",
      points: [
        "Move an application through Prep, Applied, Assessment, Interview, and Offer.",
        "Keep a checklist on each application.",
        "Compare offers and see deadlines on a calendar.",
        "Sync both ways with Notion.",
      ],
      stack: ["TanStack Start", "React 19", "TypeScript", "Tailwind CSS v4", "Notion API"],
      href: null,
      year: "",
      placeholder: false,
      screenshotNote: null,
    },
    {
      slug: "next",
      name: "PLACEHOLDER",
      summary: "PLACEHOLDER: one sentence on a project to add.",
      contribution: null,
      contributionNote: null,
      context: "PLACEHOLDER: where it came from, in one short line.",
      stack: ["PLACEHOLDER: stack"],
      href: null,
      year: "PLACEHOLDER: year",
      placeholder: true,
      screenshotNote: null,
    },
  ] satisfies Project[],
  timeline: [
    {
      id: "citi",
      kind: "work",
      org: "Software engineering placement, Citi, June 2026 – present",
      /** Role line only. Do not say production or Technology Placement Analyst. */
      title: null,
      dates: "",
      location: "",
      // Do not guess the work or a job title.
      summary: "TODO(Ryan): what to say about this placement.",
      href: "https://www.citi.com",
    },
    {
      id: "qub",
      kind: "education",
      org: "Queen's University Belfast",
      title: "Software Engineering",
      dates: "2024–present",
      location: "Belfast, Northern Ireland",
      summary: "",
      href: "https://www.qub.ac.uk",
    },
  ] satisfies TimelineItem[],
  awards: [
    {
      id: "hack-belfast",
      event: "Hack Belfast",
      result: hackAwardResult(),
      detail: "36-hour hackathon. The project was Brewstige. TODO(Ryan): Hack Belfast team size.",
      when: "PLACEHOLDER: year",
    },
    {
      id: "dublin",
      // Did not place. No award line on the page.
      event: "",
      result: "",
      detail: dublinAwardDetail(),
      when: "",
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
    {
      id: "brewstige-work",
      label: "On Brewstige",
      items: ["Least-privilege Supabase", "Apple sign-in", "Android camera"],
    },
    { id: "database", label: "Database", items: ["PostgreSQL"] },
    { id: "maps", label: "Maps", items: ["MapLibre"] },
  ] satisfies SkillGroup[],
  now: [
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
  { id: "about", label: "About", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "skills", label: "Skills", index: "05" },
  { id: "now", label: "Now", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export function getProject(slug: string): Project | undefined {
  return site.projects.find((project) => project.slug === slug);
}
