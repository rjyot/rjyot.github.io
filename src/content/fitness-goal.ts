/**
 * Chest-press goal. Not imported while `showChestPressGoal` is false,
 * so the build does not ship these numbers.
 * To publish them, set the flag in fitness.ts and render ChestPressGoal.
 */

export const chestPressGoal = {
  id: "chest-press-goal",
  label: "Chest press goal",
  start: 50,
  current: 60,
  target: 75,
  unit: "kg",
  deadline: "2026-12-31",
} as const;
