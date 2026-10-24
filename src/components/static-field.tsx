const DOTS = Array.from({ length: 86 }, (_, index) => {
  const count = 86;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = golden * index;
  const x = Math.cos(theta) * radius;
  const z = Math.sin(theta) * radius;
  return {
    cx: 50 + x * 38,
    cy: 50 + y * 34,
    r: 0.55 + (z + 1) * 0.55,
    accent: index % 17 === 0,
    opacity: 0.35 + ((z + 1) / 2) * 0.55,
  };
});

export function StaticField() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      {DOTS.map((dot, index) => (
        <circle
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.accent ? "#F0B56A" : "#8FB6FF"}
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
}

export function HeroCanvasSlot() {
  return (
    <div className="relative h-[30vh] border-t border-line bg-ink lg:h-auto lg:min-h-[100svh] lg:border-t-0 lg:border-l">
      <div data-hero-field className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0">
          <StaticField />
        </div>
      </div>
    </div>
  );
}
