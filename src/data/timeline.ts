export type LogEntry = {
  date: string; // "YYYY-MM"
  title: string;
  note?: string;
};

export const timeline: LogEntry[] = [
  {
    date: "2026-11",
    title: "Added The Lab",
    note: "A binary search stepper and a bubble vs selection vs insertion sort race, loaded lazily.",
  },
  {
    date: "2026-11",
    title: "Built the hero sorting animation",
    note: "An insertion sort generator drives the bars, and it respects reduced-motion settings.",
  },
  {
    date: "2026-11",
    title: "Started building this portfolio",
    note: "React, TypeScript, Vite and Tailwind. Set up the project, design tokens and layout.",
  },
];