import { lazy, type ComponentType } from "react";

export type Experiment = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  Component: ComponentType;
};

export const experiments: Experiment[] = [
  {
    id: "binary-search",
    title: "Binary search",
    description:
      "Each step halves the search range. Click a number to make it the target, then step through.",
    tags: ["DSA", "Algorithms"],
    Component: lazy(() => import("./BinarySearch")),
  },
  {
    id: "sort-race",
    title: "Sorting race",
    description:
      "Three sorting algorithms get the same shuffled array. A step is roughly one comparison.",
    tags: ["DSA", "Algorithms"],
    Component: lazy(() => import("./SortRace")),
  },
];