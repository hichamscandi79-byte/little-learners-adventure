import { WORLD_ITEMS } from "./worlds";

/**
 * Dev-only sanity check that every content item has the audio mappings its
 * world requires: a name/pronunciation clip for everything, plus phonics
 * and an example phrase for ABC Adventure, and a sound effect for Animals.
 * Catches a missing or mistyped mapping immediately instead of silently
 * failing on tap.
 */
export function getMissingAudioMappings(): string[] {
  const problems: string[] = [];

  for (const [worldId, items] of Object.entries(WORLD_ITEMS)) {
    for (const item of items) {
      if (!item.audio.word) {
        problems.push(`${worldId}/${item.id}: missing audio.word`);
      }
      if (worldId === "abc" && !item.audio.phonics) {
        problems.push(`${worldId}/${item.id}: missing audio.phonics`);
      }
      if (worldId === "abc" && !item.audio.phrase) {
        problems.push(`${worldId}/${item.id}: missing audio.phrase`);
      }
      if (worldId === "animals" && !item.audio.sound) {
        problems.push(`${worldId}/${item.id}: missing audio.sound`);
      }
    }
  }

  return problems;
}
