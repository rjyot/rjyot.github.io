import { fitness } from "@/content/fitness";

export function FitnessPanel() {
  const { line, approach, updatedLabel, october, lifts } = fitness;
  const peak = Math.max(...october.volumes);
  const showSessions = october.count > 0;

  return (
    <div id="fitness" tabIndex={-1} className="border-t-4 border-blue bg-ink p-6">
      <h3 className="font-display text-3xl font-extrabold tracking-tight">Fitness</h3>
      <p className="mt-4 max-w-[40rem] text-lg text-paper">{line}</p>
      <p className="mt-2 max-w-[40rem] text-lg text-muted">{approach}</p>
      <p className="mt-4 text-lg text-muted">
        <time dateTime={fitness.asOf}>{updatedLabel}</time>
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {showSessions ? (
          <article className="border border-line p-5">
            <h4 className="text-lg font-semibold text-blue-bright">{october.label}</h4>
            <p className="mt-3 font-display text-5xl font-extrabold tracking-tight">{october.count}</p>
            <p className="mt-4 text-lg text-paper">
              {october.volumeKg.toLocaleString("en-GB")} kg moved
            </p>
            <ul className="mt-5 flex items-end gap-3" aria-label="Session volumes, in kilograms">
              {october.volumes.map((kg) => (
                <li key={kg} className="flex min-w-0 flex-1 flex-col justify-end">
                  <span
                    className="block bg-blue"
                    style={{ height: `${Math.round((kg / peak) * 96)}px` }}
                  />
                  <span className="mt-2 text-lg text-muted">{kg.toLocaleString("en-GB")}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
        {lifts.map((lift) => (
          <article key={lift.name} className="border border-line p-5">
            <h4 className="text-lg font-semibold text-blue-bright">{lift.name}</h4>
            <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
              {lift.from} <span aria-hidden="true">→</span> {lift.to} {lift.unit}
            </p>
            {lift.notes.map((note) => (
              <p key={note} className="mt-2 text-lg text-paper">
                {note}
              </p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
