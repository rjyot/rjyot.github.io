"use client";

export function PrintCvButton() {
  return (
    <button
      type="button"
      className="no-print border border-paper px-4 py-2 text-lg font-semibold text-paper"
      aria-label="Print this CV or save it as a PDF"
      onClick={() => window.print()}
    >
      Print / Save as PDF
    </button>
  );
}
