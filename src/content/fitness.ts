/**
 * Gym figures from a manual Hevy export, 23 Oct 2026.
 * The chest-press goal stays off the page until Ryan turns the flag on.
 * No weekday schedule, body weight, calories, or injury notes.
 */

export const fitnessConfig: { showChestPressGoal: boolean } = {
  showChestPressGoal: false,
};

export const fitness = {
  asOf: "2026-10-23",
  source: "Hevy workout log",
  goal: {
    id: "chest-press-goal",
    label: "Chest press goal",
    start: 50,
    current: 60,
    target: 75,
    unit: "kg",
    deadline: "2026-12-31",
  },
} as const;
