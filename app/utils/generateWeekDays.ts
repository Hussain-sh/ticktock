export function parseTimesheetStartDate(dateStr: string): Date {
  // Format 1: "1 - 5 January, 2024"
  const format1 = dateStr.match(/^(\d+)\s*-\s*\d+\s+(\w+),\s*(\d{4})/);
  if (format1) {
    const [, day, month, year] = format1;
    return new Date(`${month} ${day}, ${year}`);
  }

  // Format 2: "28 January - 1 February, 2024"
  const format2 = dateStr.match(/^(\d+)\s+(\w+)\s*-/);
  if (format2) {
    const [, day, month] = format2;
    const year = dateStr.match(/(\d{4})/)?.[1] ?? "";
    return new Date(`${month} ${day}, ${year}`);
  }

  return new Date(0);
}

export function generateWeekDays(dateStr: string): string[] {
  const startDate = parseTimesheetStartDate(dateStr);
  const days: string[] = [];

  for (let i = 0; i < 5; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  }

  return days;
}