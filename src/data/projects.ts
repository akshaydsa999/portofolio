export type Project = {
  name: string;
  summary: string;
  stack: string[];
  github?: string;
  demo?: string;
  placeholder?: boolean;
};

export type Screenshot = { src: string; alt: string; label: string };

export type FeaturedProjectData = Project & {
  problem: string;
  solution: string;
  built?: string;
  learned?: string[];
  next?: string[];
  images?: Screenshot[]; // files go in public/projects
};

export const featured: FeaturedProjectData = {
  name: "Kyakhaoge",
  summary:
    "A household meal planner that ends the daily \"kya khaoge?\" question: one rotating menu that mom, dad and the maid all work from. Built with AI assistance.",
  problem:
    "Every day my mom asked my brother and me what to cook. I'd ask for shahi paneer and find there was no paneer at home, or ask for rajma chawal when the rajma hadn't been soaked the night before. She also had to tell my dad what to buy and explain the menu to our maid. The daily confusion annoyed all of us, and I didn't want her carrying that stress.",
  solution:
    "A rotating 21-day vegetarian menu planned in advance, so everyone knows what's being cooked and what needs to be bought or soaked beforehand. Mom controls the plan, Dad knows what to bring from outside, and the maid knows what to make each day. It has daily and weekly views, cooking-time estimates and backup meals, grocery lists scaled to household size, one-tap WhatsApp messages, and calendar reminders for meal prep and overnight soaking.",
  built:
    "I planned the features and wrote down the dishes from our handwritten family notes, then built it in HTML, CSS and JavaScript with Claude's help. Data is saved in the browser's Local Storage, and it's hosted on GitHub.",
  next: [
    "Let mom add or edit a meal herself when she wants something other than the plan.",
    "A small AI assistant inside the app that suggests what else to make.",
  ],
  stack: ["HTML", "CSS", "JavaScript", "Local Storage"],
  github: "https://github.com/akshaydsa999/kyakhaoge",
  demo: "https://akshaydsa999.github.io/kyakhaoge/",
  images: [
    {
      src: "/projects/kyakhaoge.png",
      label: "Daily menu",
      alt: "Kyakhaoge's daily view showing today's breakfast and lunch with ingredients and cooking time",
    },
    {
      src: "/projects/kyakhaoge-groceries.png",
      label: "Grocery list",
      alt: "Kyakhaoge's grocery checklist with quantities, plus a phone reminder card",
    },
  ],
};

export const projects: Project[] = [];