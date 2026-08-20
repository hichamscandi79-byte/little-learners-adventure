import type { LearningItem } from "../types/content";
import { audioPath } from "../audio/audioManifest";

interface LetterSeed {
  letter: string;
  word: string;
  emoji: string;
}

const SEEDS: LetterSeed[] = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Egg", emoji: "🥚" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Grapes", emoji: "🍇" },
  { letter: "H", word: "Hat", emoji: "🎩" },
  { letter: "I", word: "Ice Cream", emoji: "🍦" },
  { letter: "J", word: "Juice", emoji: "🧃" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Moon", emoji: "🌙" },
  { letter: "N", word: "Nest", emoji: "🪺" },
  { letter: "O", word: "Orange", emoji: "🍊" },
  { letter: "P", word: "Pig", emoji: "🐷" },
  { letter: "Q", word: "Queen", emoji: "👑" },
  { letter: "R", word: "Rainbow", emoji: "🌈" },
  { letter: "S", word: "Sun", emoji: "☀️" },
  { letter: "T", word: "Tree", emoji: "🌳" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Van", emoji: "🚐" },
  { letter: "W", word: "Watermelon", emoji: "🍉" },
  { letter: "X", word: "Xylophone", emoji: "🎵" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

export const LETTERS: LearningItem[] = SEEDS.map(({ letter, word, emoji }) => {
  const id = letter.toLowerCase();
  return {
    id: `letter-${id}`,
    worldId: "abc",
    primary: `${letter}${letter.toLowerCase()}`,
    secondary: word,
    label: letter,
    emoji,
    audio: {
      word: audioPath("letters", id),
      phonics: audioPath("phonics", id),
      phrase: audioPath("letters", `${id}-phrase`),
    },
    meta: { exampleWord: word },
  };
});
