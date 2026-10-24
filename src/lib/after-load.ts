/** Run after the window load event, then in an idle slice, so it stays off the first paint. */
export function afterLoad(task: () => void, timeout = 1500): () => void {
  if (typeof window === "undefined") return () => {};

  let cancelled = false;
  let idleId = 0;
  let timerId = 0;

  const run = () => {
    if (cancelled) return;
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      idleId = idle(() => {
        if (!cancelled) task();
      }, { timeout });
    } else {
      timerId = window.setTimeout(() => {
        if (!cancelled) task();
      }, 1);
    }
  };

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    if (idleId && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleId);
    }
    if (timerId) window.clearTimeout(timerId);
  };
}
