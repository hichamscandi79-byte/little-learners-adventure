import type { LearningItem } from "../types/content";

const WORDS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

export const NUMBERS: LearningItem[] = WORDS.map((word, index) => {
  const value = index + 1;
  return {
    id: `number-${value}`,
    worldId: "numbers",
    primary: String(value),
    secondary: word,
    label: word,
    emoji: "🔵",
    audio: {
      word: `audio/en/numbers/${value}.mp3`,
    },
    meta: { count: value },
  };
});
