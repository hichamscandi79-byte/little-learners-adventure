/**
 * Future progress/reward data model (Phase 4).
 *
 * V1 will persist this shape to local device storage only — no accounts,
 * no cloud sync. Defined now so Phase 1 content components can be built
 * against a stable shape; no persistence or reward logic is wired up yet.
 */

export interface ProgressSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  reducedMotion: boolean;
}

export interface ProgressState {
  lettersCompleted: string[];
  numbersCompleted: string[];
  colorsCompleted: string[];
  shapesCompleted: string[];
  animalsCompleted: string[];
  wordsCompleted: string[];
  stars: number;
  stickersUnlocked: string[];
  settings: ProgressSettings;
}

export const defaultProgress: ProgressState = {
  lettersCompleted: [],
  numbersCompleted: [],
  colorsCompleted: [],
  shapesCompleted: [],
  animalsCompleted: [],
  wordsCompleted: [],
  stars: 0,
  stickersUnlocked: [],
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    reducedMotion: false,
  },
};
