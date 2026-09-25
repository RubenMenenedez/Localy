const MINUTES_PER_DAY = 24 * 60;

export function minutesToTime(minutes: number) {
  const normalized = minutes % MINUTES_PER_DAY;
  const hours = Math.floor(normalized / 60).toString().padStart(2, "0");
  const mins = (normalized % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

// A closing time of 00:00 means midnight at the end of the day.
export function timeToMinutes(time: string, { isClosing = false } = {}) {
  const [hours, mins] = time.split(":").map(Number);
  const minutes = hours * 60 + mins;
  return isClosing && minutes === 0 ? MINUTES_PER_DAY : minutes;
}
