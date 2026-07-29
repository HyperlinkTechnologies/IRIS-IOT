let timeoutId = null;

const EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
];

export function startSessionTimeout(timeoutMinutes, onTimeout) {
  stopSessionTimeout();

  const timeout = timeoutMinutes * 60 * 1000;

  const resetTimer = () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      onTimeout();
    }, timeout);
  };

  EVENTS.forEach((event) =>
    window.addEventListener(event, resetTimer)
  );

  resetTimer();

  return () => {
    EVENTS.forEach((event) =>
      window.removeEventListener(event, resetTimer)
    );

    clearTimeout(timeoutId);
  };
}

export function stopSessionTimeout() {
  clearTimeout(timeoutId);
}