/**
 * Real photographs of Belfast, with the licence each file requires.
 * These are not photos of Ryan and not screenshots of Brewstige.
 * Pixel sizes match the files in public/photos/. Both were recompressed for this page.
 */

export type PhotoCredit = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  photographer: string;
  photographerUrl: string | null;
  licence: string;
  licenceUrl: string | null;
  changes: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const belfastPhotos: PhotoCredit[] = [
  {
    id: "belfast-skyline",
    src: "/photos/belfast-skyline.jpg",
    width: 1024,
    height: 574,
    alt: "Belfast skyline, seen from the hills south of the city.",
    caption: "Belfast skyline by Thomas Nugent.",
    photographer: "Thomas Nugent",
    photographerUrl: "https://www.geograph.org.uk/profile/4827",
    licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    changes: "Recompressed for this page.",
    sourceLabel: "Geograph",
    sourceUrl: "https://www.geograph.org.uk/photo/6219085",
  },
];
