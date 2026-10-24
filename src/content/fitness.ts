/**
 * Gym figures from a manual Hevy export, 23 Oct 2026.
 * No weekday schedule, session times, gym name, body weight, calories, or injury notes.
 *
 * The 75 kg chest-press goal is not part of this module. It lives in
 * fitness-goal.ts and is left out of the build while the flag is off.
 */

export const fitnessConfig: { showChestPressGoal: boolean } = {
  showChestPressGoal: false,
};

export const fitness = {
  asOf: "2026-10-23",
  updatedLabel: "Updated 23 Oct",
  line: "Lifting, playing football, logging every rep.",
  approach: "Same approach as code: log it, measure it, ship a little more each week.",
  october: {
    label: "Gym sessions in October",
    count: 4,
    volumeKg: 14811,
    volumeCaption: "Total kg moved in October",
    sessions: [
      { date: "2026-10-14", volumeKg: 3374 },
      { date: "2026-10-16", volumeKg: 2870 },
      { date: "2026-10-20", volumeKg: 5190 },
      { date: "2026-10-23", volumeKg: 3377 },
    ],
  },
  lifts: [
    {
      name: "Chest press",
      from: 50,
      to: 60,
      unit: "kg",
      notes: ["+20% since 16 Oct"],
    },
    {
      name: "Pec deck",
      from: 52,
      to: 59,
      unit: "kg",
      notes: ["Best weight, October"],
    },
  ],
} as const;
