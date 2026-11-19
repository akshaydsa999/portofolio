export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["C++", "C", "Python", "SQL", "JavaScript", "TypeScript"] },
  {
    title: "Core CS & web",
    items: ["Data structures & algorithms", "React", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  { title: "Tools", items: ["Linux (command line)", "Git", "GitHub"] },
  { title: "Currently learning", items: ["Machine learning", "Backend development"] },
];