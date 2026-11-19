import { site } from "./site";

export const about = {
  paragraphs: [
    "I'm Akshay, a first-year CSE student at MIT Manipal. I like turning ideas into small working programs, and I'm early enough in my degree that most of what I build is also how I learn.",
    "Right now I'm working through C++ and data structures and algorithms, with web projects alongside. I'm also getting into AI/ML, mostly by trying things out rather than just reading about them.",
    "I want to grow into a software engineer who works on serious software, including AI systems. Until then, this site is where I keep my projects, experiments and notes as they happen.",
  ],
  facts: [
    { label: "Studying", value: "BTech CSE · MIT Manipal" },
    { label: "Year", value: "First year" }, // update each year
    { label: "Clubs", value: "IECSE · ACM · TDA · E-Cell" },
    { label: "Focus", value: site.focus.join(" · ") },
  ],
};