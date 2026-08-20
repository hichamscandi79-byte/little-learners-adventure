import type { LearningItem } from "../types/content";

type WordCategory = "Food" | "Home" | "Nature" | "Things" | "People";

interface WordSeed {
  name: string;
  emoji: string;
  category: WordCategory;
}

const SEEDS: WordSeed[] = [
  // Food
  { name: "Apple", emoji: "🍎", category: "Food" },
  { name: "Banana", emoji: "🍌", category: "Food" },
  { name: "Milk", emoji: "🥛", category: "Food" },
  { name: "Bread", emoji: "🍞", category: "Food" },
  { name: "Egg", emoji: "🥚", category: "Food" },
  { name: "Cookie", emoji: "🍪", category: "Food" },
  // Home
  { name: "Bed", emoji: "🛏️", category: "Home" },
  { name: "Door", emoji: "🚪", category: "Home" },
  { name: "Chair", emoji: "🪑", category: "Home" },
  { name: "Table", emoji: "🍽️", category: "Home" },
  { name: "Cup", emoji: "🥤", category: "Home" },
  { name: "Book", emoji: "📖", category: "Home" },
  // Nature
  { name: "Sun", emoji: "☀️", category: "Nature" },
  { name: "Moon", emoji: "🌙", category: "Nature" },
  { name: "Tree", emoji: "🌳", category: "Nature" },
  { name: "Flower", emoji: "🌸", category: "Nature" },
  { name: "Rain", emoji: "🌧️", category: "Nature" },
  { name: "Cloud", emoji: "☁️", category: "Nature" },
  // Things
  { name: "Ball", emoji: "⚽", category: "Things" },
  { name: "Car", emoji: "🚗", category: "Things" },
  { name: "Shoe", emoji: "👟", category: "Things" },
  { name: "Hat", emoji: "🎩", category: "Things" },
  { name: "Bag", emoji: "🎒", category: "Things" },
  { name: "Balloon", emoji: "🎈", category: "Things" },
  // People
  { name: "Mom", emoji: "👩", category: "People" },
  { name: "Dad", emoji: "👨", category: "People" },
  { name: "Baby", emoji: "👶", category: "People" },
  { name: "Friend", emoji: "🧑‍🤝‍🧑", category: "People" },
  { name: "Teacher", emoji: "🧑‍🏫", category: "People" },
  { name: "Sister", emoji: "👧", category: "People" },
];

export const WORDS: LearningItem[] = SEEDS.map(({ name, emoji, category }) => ({
  id: `word-${name.toLowerCase()}`,
  worldId: "words",
  primary: name,
  label: name,
  emoji,
  audio: {
    word: `audio/en/words/${name.toLowerCase()}.mp3`,
  },
  meta: { category },
}));

export const WORD_CATEGORIES: WordCategory[] = [
  "Food",
  "Home",
  "Nature",
  "Things",
  "People",
];
