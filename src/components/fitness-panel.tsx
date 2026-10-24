import { fitness, fitnessConfig } from "@/content/fitness";
import { isDev } from "@/lib/publish";

function sessionDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function FitnessPanel() {
  const { line, approach, updatedLabel, october, lifts } = fitness;
  const peak = Math.max(...october.sessions.map((session) => session.volumeKg));

  return (
    <div id="fitness" tabIndex={-1} className="border-t-4 border-blue bg-ink p-6">
      <h3 className="font-display text-3xl font-extrabold tracking-tight">Fitness</h3>
      <p className="mt-4 max-w-[40rem] text-lg text-paper">{line}</p>
      {!fitnessConfig.showFootball && isDev ? (
        <p className="mt-2 text-lg text-amber">TODO(Ryan): football</p>
      ) : null}
      <p className="mt-2 max-w-[40rem] text-lg text-muted">{approach}</p>
      <p className="mt-4 text-lg text-muted">
        <time dateTime={fitness.asOf}>{updatedLabel}</time>
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {fitnessConfig.showSessionCount || isDev ? (
        <article className="border border-line p-5">
          <h4 className="text-lg font-semibold text-blue-bright">{october.label}</h4>
          {fitnessConfig.showSessionCount ? (
            october.count > 0 ? (
              <p className="mt-3 font-display text-5xl font-extrabold tracking-tight">{october.count}</p>
            ) : null
          ) : isDev ? (
            <p className="mt-3 text-lg text-amber">TODO(Ryan): session count</p>
          ) : null}
          {fitnessConfig.showSessionCount ? (
            <figure className="mt-5" aria-label={october.chartLabel}>
              <figcaption className="text-lg font-semibold text-paper">Volume per session (kg)</figcaption>
              <ul aria-hidden="true" className="mt-4 flex items-end gap-3">
                {october.sessions.map((session) => (
                  <li key={session.date} className="flex min-w-0 flex-1 flex-col justify-end">
                    <span
                      className="block bg-blue"
                      style={{ height: `${Math.round((session.volumeKg / peak) * 96)}px` }}
                    />
                    <span className="mt-2 text-lg text-muted">
                      {session.volumeKg.toLocaleString("en-GB")}
                    </span>
                    <time className="text-lg text-muted" dateTime={session.date}>
                      {sessionDate(session.date)}
                    </time>
                  </li>
                ))}
              </ul>
              <table className="sr-only">
                <caption>Volume per session (kg)</caption>
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Volume (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {october.sessions.map((session) => (
                    <tr key={session.date}>
                      <td>{sessionDate(session.date)}</td>
                      <td>{session.volumeKg.toLocaleString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          ) : null}
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

        <article className="border border-line p-5">
          <h4 className="text-lg font-semibold text-blue-bright">Volume</h4>
          <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
            {october.volumeKg.toLocaleString("en-GB")} kg moved in October
          </p>
        </article>
      </div>
    </div>
  );
}
