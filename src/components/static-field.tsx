export function StaticField() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <pattern id="field-dots" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="1.1" cy="1.1" r="0.7" fill="#8FB6FF" />
        <circle cx="4.6" cy="4.6" r="0.45" fill="#F0B56A" />
      </pattern>
      <rect width="100" height="100" fill="url(#field-dots)" />
    </svg>
  );
}

export function HeroCanvasSlot() {
  return (
    <div className="relative hidden border-line bg-ink lg:block lg:h-auto lg:min-h-[100svh] lg:border-l">
      <div data-hero-field className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0">
          <StaticField />
        </div>
      </div>
    </div>
  );
}
