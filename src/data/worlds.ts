import type { LearningItem, WorldId, WorldMeta } from "../types/content";
import { LETTERS } from "./letters";
import { NUMBERS } from "./numbers";
import { COLORS } from "./colors";
import { SHAPES } from "./shapes";
import { ANIMALS } from "./animals";
import { WORDS } from "./words";

export const WORLD_ITEMS: Record<WorldId, LearningItem[]> = {
  abc: LETTERS,
  numbers: NUMBERS,
  colors: COLORS,
  shapes: SHAPES,
  animals: ANIMALS,
  words: WORDS,
};

export const WORLDS: WorldMeta[] = [
  {
    id: "abc",
    title: "ABC Adventure",
    tagline: "Letters & phonics",
    route: "/world/abc",
    emoji: "🔤",
    color: "var(--color-coral)",
    colorSoft: "var(--color-coral-soft)",
    itemCount: LETTERS.length,
  },
  {
    id: "numbers",
    title: "Numbers",
    tagline: "Counting & quantities",
    route: "/world/numbers",
    emoji: "🔢",
    color: "var(--color-sky)",
    colorSoft: "var(--color-sky-soft)",
    itemCount: NUMBERS.length,
  },
  {
    id: "colors",
    title: "Colors",
    tagline: "See & name colors",
    route: "/world/colors",
    emoji: "🎨",
    color: "var(--color-pink)",
    colorSoft: "var(--color-pink-soft)",
    itemCount: COLORS.length,
  },
  {
    id: "shapes",
    title: "Shapes",
    tagline: "Spot every shape",
    route: "/world/shapes",
    emoji: "🔺",
    color: "var(--color-yellow)",
    colorSoft: "var(--color-yellow-soft)",
    itemCount: SHAPES.length,
  },
  {
    id: "animals",
    title: "Animals",
    tagline: "Meet & hear animals",
    route: "/world/animals",
    emoji: "🐾",
    color: "var(--color-mint)",
    colorSoft: "var(--color-mint-soft)",
    itemCount: ANIMALS.length,
  },
  {
    id: "words",
    title: "First Words",
    tagline: "Everyday first words",
    route: "/world/words",
    emoji: "💬",
    color: "var(--color-purple)",
    colorSoft: "var(--color-purple-soft)",
    itemCount: WORDS.length,
  },
];

export function getWorld(id: WorldId): WorldMeta | undefined {
  return WORLDS.find((world) => world.id === id);
}

export function getWorldItems(id: WorldId): LearningItem[] {
  return WORLD_ITEMS[id] ?? [];
}
