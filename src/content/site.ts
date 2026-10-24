/**
 * SITE CONTENT
 * ------------
 * All public copy lives in this file. Search for "PLACEHOLDER" and replace
 * those strings. Do not guess employers, grades, awards, dates, or metrics.
 *
 * Filled-in facts are from Ryan Jyothis's public GitHub profile README
 * (https://github.com/rjyot/rjyot), read 2026-10-24, and from the Brewstige
 * brief: an Expo / React Native café app at https://github.com/rjyot/brewstige.
 *
 * A public fetch of that Brewstige URL returned 404 on 2026-10-24. The link
 * stays because it is the stated repository. Confirm it before sharing widely.
 */

export type Project = {
  slug: string;
  name: string;
  summary: string;
  context: string;
  stack: string[];
  href: string | null;
  year: string;
  /** True when the card is an open slot, not a shipped project. */
  placeholder: boolean;
};

export type TimelineItem = {
  id: string;
  kind: "work" | "education";
  org: string;
  title: string;
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

export type Stat = {
  id: string;
  label: string;
  value: number;
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

export const site = {
  name: "Ryan Jyothis",
  firstName: "Ryan",
  lastName: "Jyothis",
  role: "Software Engineering student",
  tagline: "The space between an idea and a usable product.",
  location: "Belfast, Northern Ireland",
  availability: "Open to summer 2027 SWE internships in the UK and Ireland",
  github: "https://github.com/rjyot",
  githubHandle: "rjyot",
  profileReadme: "https://github.com/rjyot/rjyot",
  /**
   * Email is not on the public profile. Leave null until a real address exists.
   * The contact section renders `emailPlaceholder` and does not invent a link.
   */
  email: null as string | null,
  emailPlaceholder: "PLACEHOLDER: email address",
  about: [
    "Integrated MEng Software Engineering student at Queen's University Belfast, 2024 to 2029.",
    "Currently a Technology Placement Analyst at Citi.",
    "The part of software I enjoy most is the space between an idea and a usable product.",
    "Shaping the interface, connecting the data, and getting the small details right so the whole thing actually works.",
    "Looking for summer 2027 software engineering internships in the UK and Ireland.",
  ],
  stats: [
    {
      id: "start",
      label: "MEng started",
      value: 2024,
      hint: "Queen's University Belfast",
    },
    {
      id: "end",
      label: "MEng through",
      value: 2029,
      hint: "Integrated master's",
    },
    {
      id: "intern",
      label: "Internship summer",
      value: 2027,
      hint: "UK and Ireland",
    },
    {
      id: "team",
      label: "Brewstige team",
      value: 5,
      hint: "People at Hack Belfast",
    },
  ] satisfies Stat[],
  projects: [
    {
      slug: "brewstige",
      name: "Brewstige",
      summary: "A café app built with Expo and React Native.",
      context:
        "Hack Belfast, a 24-hour hackathon. Runner-up for Best Real World Impact, on a five-person team.",
      stack: ["Expo", "React Native"],
      href: "https://github.com/rjyot/brewstige",
      year: "PLACEHOLDER: year",
      placeholder: false,
    },
    {
      slug: "zeto",
      name: "Zeto",
      summary: "PLACEHOLDER: one sentence on what Zeto does.",
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
      title: "Technology Placement Analyst",
      dates: "PLACEHOLDER: start and end dates",
      location: "PLACEHOLDER: office location",
      summary:
        "PLACEHOLDER: one or two short sentences on the work. Do not guess this.",
      href: "https://www.citi.com",
    },
    {
      id: "qub",
      kind: "education",
      org: "Queen's University Belfast",
      title: "MEng Software Engineering",
      dates: "2024 – 2029",
      location: "Belfast, Northern Ireland",
      summary: "Integrated master's.",
      href: "https://www.qub.ac.uk",
    },
  ] satisfies TimelineItem[],
  awards: [
    {
      id: "hack-belfast",
      event: "Hack Belfast",
      result: "Runner-up, Best Real World Impact",
      detail: "24-hour hackathon. Five-person team. The project was Brewstige.",
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
      id: "leetcode",
      title: "LeetCode patterns",
      status: "PLACEHOLDER: the pattern in focus",
      detail: "PLACEHOLDER: one short line on how it's going. No invented counts.",
    },
    {
      id: "arabic",
      title: "Arabic",
      status: "PLACEHOLDER: what you're studying",
      detail: "PLACEHOLDER: one short line. No invented level.",
    },
    {
      id: "gym",
      title: "Gym",
      status: "PLACEHOLDER: what you're training",
      detail: "PLACEHOLDER: one short line. No invented numbers.",
    },
    {
      id: "streak",
      title: "GitHub streak",
      status: "PLACEHOLDER: current streak in days",
      detail: "A daily commit streak. The count changes, so it is not hardcoded here.",
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
    "Hiring for summer 2027 software engineering internships in the UK or Ireland? Get in touch on LinkedIn or Instagram.",
};

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
