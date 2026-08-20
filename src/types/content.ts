/**
 * Core data-driven content model for Little Learners Adventure.
 *
 * Every Learning World (ABC, Numbers, Colors, Shapes, Animals, First Words)
 * is rendered from arrays of `LearningItem` — there are no hard-coded
 * per-letter/per-item screens. New items or whole languages can be added by
 * extending the data files in `src/data/`, not by writing new components.
 */

export type WorldId =
  | "abc"
  | "numbers"
  | "colors"
  | "shapes"
  | "animals"
  | "words";

export interface WorldMeta {
  id: WorldId;
  title: string;
  tagline: string;
  route: string;
  /** Placeholder visual identity until custom illustrations/icons exist. */
  emoji: string;
  color: string;
  colorSoft: string;
  itemCount: number;
}

/** Paths are logical references into the audio architecture, not yet loaded. */
export interface AudioRefs {
  word?: string;
  phonics?: string;
  instruction?: string;
}

export interface LearningItem {
  id: string;
  worldId: WorldId;
  /** Large primary glyph/text shown on the tile, e.g. "Aa", "5", "Red". */
  primary: string;
  /** Optional secondary text, e.g. an example word under a letter. */
  secondary?: string;
  /** Spoken/accessible name, e.g. "Apple", "Five", "Red". */
  label: string;
  /** Placeholder visual until production illustrations are ready. */
  emoji?: string;
  /** Used by the Colors world for swatch rendering. */
  colorHex?: string;
  audio: AudioRefs;
  /** World-specific extra data (example word, animal sound, quantity, category). */
  meta?: Record<string, string | number>;
}
