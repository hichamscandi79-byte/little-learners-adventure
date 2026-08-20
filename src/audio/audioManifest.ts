/**
 * Audio architecture stub (Phase 1).
 *
 * Production audio is recorded/generated in Phase 2. This module only
 * establishes the folder layout and lookup shape so content data (see
 * `src/data/*`) can already reference stable audio paths.
 *
 * Expected files live under `public/audio/`:
 *   audio/en/letters/       — letter name recordings, e.g. a.mp3
 *   audio/en/phonics/       — letter sound recordings, e.g. a.mp3
 *   audio/en/numbers/       — number word recordings, e.g. 1.mp3
 *   audio/en/colors/        — color name recordings
 *   audio/en/shapes/        — shape name recordings
 *   audio/en/animals/       — animal name + sound recordings
 *   audio/en/words/         — first-word recordings
 *   audio/en/instructions/  — short UI prompts ("Tap to hear!")
 *   audio/sfx/              — reward/feedback sound effects
 */

export const AUDIO_LOCALE = "en";

export const AUDIO_BASE_PATH = `/audio/${AUDIO_LOCALE}`;

export const AUDIO_CATEGORIES = [
  "letters",
  "phonics",
  "numbers",
  "colors",
  "shapes",
  "animals",
  "words",
  "instructions",
] as const;

export type AudioCategory = (typeof AUDIO_CATEGORIES)[number];

export function audioPath(category: AudioCategory, fileId: string): string {
  return `${AUDIO_BASE_PATH}/${category}/${fileId}.mp3`;
}

/**
 * Placeholder playback hook — no real audio files ship in Phase 1.
 * Logs the intended file so the interaction pattern (tap-to-listen) is
 * already wired through the UI ahead of the real audio library.
 */
export function playPlaceholderAudio(path: string): void {
  if (import.meta.env.DEV) {
    console.info(`[audio placeholder] would play: ${path}`);
  }
}
