import type { LearningItem } from "../types/content";
import { audioPath } from "../audio/audioManifest";

interface ShapeSeed {
  name: string;
  emoji: string;
}

const SEEDS: ShapeSeed[] = [
  { name: "Circle", emoji: "⭕" },
  { name: "Square", emoji: "🟧" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Rectangle", emoji: "▭" },
  { name: "Star", emoji: "⭐" },
  { name: "Heart", emoji: "💖" },
  { name: "Oval", emoji: "🥚" },
  { name: "Diamond", emoji: "🔷" },
];

export const SHAPES: LearningItem[] = SEEDS.map(({ name, emoji }) => ({
  id: `shape-${name.toLowerCase()}`,
  worldId: "shapes",
  primary: name,
  label: name,
  emoji,
  audio: {
    word: audioPath("shapes", name.toLowerCase()),
  },
}));
