import type { LearningItem } from "../types/content";

interface ColorSeed {
  name: string;
  hex: string;
  emoji: string;
}

const SEEDS: ColorSeed[] = [
  { name: "Red", hex: "#F0453A", emoji: "🍓" },
  { name: "Orange", hex: "#FF9F45", emoji: "🍊" },
  { name: "Yellow", hex: "#FFD65A", emoji: "🍋" },
  { name: "Green", hex: "#5FCB6B", emoji: "🍏" },
  { name: "Blue", hex: "#55C7F3", emoji: "🫐" },
  { name: "Purple", hex: "#8B6FE8", emoji: "🍇" },
  { name: "Pink", hex: "#F58AC6", emoji: "🌸" },
  { name: "Brown", hex: "#A9713F", emoji: "🐻" },
  { name: "Black", hex: "#3A3F4B", emoji: "🐈‍⬛" },
  { name: "White", hex: "#F5F5F5", emoji: "☁️" },
];

export const COLORS: LearningItem[] = SEEDS.map(({ name, hex, emoji }) => ({
  id: `color-${name.toLowerCase()}`,
  worldId: "colors",
  primary: name,
  label: name,
  emoji,
  colorHex: hex,
  audio: {
    word: `audio/en/colors/${name.toLowerCase()}.mp3`,
  },
}));
