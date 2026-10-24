export function DevTodoBanner() {
  if (process.env.NODE_ENV !== "development") return null;

  const items = [
    "Citi placement wording",
    "CV PDF",
    "Email address",
    "Photo of Ryan",
    "Brewstige screenshot",
    "Café-owner count, letter of interest, and paying client",
    "Camera fix on a real phone",
    "Hack Belfast team size",
    "Football",
    "October session count",
    "75 kg chest-press goal",
    "Arabic script check",
    "Zeto summary",
    "Open project slot",
    "Experience dates and office",
    "Learning counts",
  ];

  return (
    <aside
      data-dev-banner
      className="fixed inset-x-0 bottom-0 z-50 border-t border-amber bg-ink/95 px-4 py-2 text-sm text-amber"
    >
      <p className="font-semibold">Dev only. Open TODOs</p>
      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {items.map((item) => (
          <li key={item}>TODO(Ryan): {item}</li>
        ))}
      </ul>
    </aside>
  );
}
