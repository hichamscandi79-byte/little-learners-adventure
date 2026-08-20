import type { LearningItem } from "../types/content";
import { audioPath } from "../audio/audioManifest";

interface ColorSeed {
  name: string;
  hex: string;
  emoji: string;
  /** Real-world object used as the "visual example" for this color. */
  example: string;
}

const SEEDS: ColorSeed[] = [
  { name: "Red", hex: "#F0453A", emoji: "🍓", example: "Strawberry" },
  { name: "Orange", hex: "#FF9F45", emoji: "🍊", example: "Orange" },
  { name: "Yellow", hex: "#FFD65A", emoji: "🍋", example: "Lemon" },
  { name: "Green", hex: "#5FCB6B", emoji: "🍏", example: "Apple" },
  { name: "Blue", hex: "#55C7F3", emoji: "🫐", example: "Blueberry" },
  { name: "Purple", hex: "#8B6FE8", emoji: "🍇", example: "Grapes" },
  { name: "Pink", hex: "#F58AC6", emoji: "🌸", example: "Blossom" },
  { name: "Brown", hex: "#A9713F", emoji: "🐻", example: "Bear" },
  { name: "Black", hex: "#3A3F4B", emoji: "🐈‍⬛", example: "Cat" },
  { name: "White", hex: "#F5F5F5", emoji: "☁️", example: "Cloud" },
];

export const COLORS: LearningItem[] = SEEDS.map(({ name, hex, emoji, example }) => ({
  id: `color-${name.toLowerCase()}`,
  worldId: "colors",
  primary: name,
  label: name,
  emoji,
  colorHex: hex,
  audio: {
    word: audioPath("colors", name.toLowerCase()),
  },
  meta: { example },
}));
