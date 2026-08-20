import type { LearningItem } from "../types/content";

interface AnimalSeed {
  name: string;
  emoji: string;
  sound: string;
}

const SEEDS: AnimalSeed[] = [
  { name: "Dog", emoji: "🐶", sound: "Woof!" },
  { name: "Cat", emoji: "🐱", sound: "Meow!" },
  { name: "Cow", emoji: "🐮", sound: "Moo!" },
  { name: "Duck", emoji: "🦆", sound: "Quack!" },
  { name: "Pig", emoji: "🐷", sound: "Oink!" },
  { name: "Sheep", emoji: "🐑", sound: "Baa!" },
  { name: "Horse", emoji: "🐴", sound: "Neigh!" },
  { name: "Lion", emoji: "🦁", sound: "Roar!" },
  { name: "Elephant", emoji: "🐘", sound: "Toot!" },
  { name: "Monkey", emoji: "🐵", sound: "Ooh ooh!" },
  { name: "Frog", emoji: "🐸", sound: "Ribbit!" },
  { name: "Bird", emoji: "🐦", sound: "Tweet!" },
  { name: "Fish", emoji: "🐟", sound: "Blub!" },
  { name: "Rabbit", emoji: "🐰", sound: "Thump!" },
  { name: "Bear", emoji: "🐻", sound: "Grr!" },
];

export const ANIMALS: LearningItem[] = SEEDS.map(({ name, emoji, sound }) => ({
  id: `animal-${name.toLowerCase()}`,
  worldId: "animals",
  primary: name,
  secondary: sound,
  label: name,
  emoji,
  audio: {
    word: `audio/en/animals/${name.toLowerCase()}.mp3`,
  },
  meta: { sound },
}));
