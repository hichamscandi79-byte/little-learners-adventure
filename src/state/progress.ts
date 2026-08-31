/**
 * Local, account-free progress & rewards store (Phase 3).
 *
 * Tracks whether each learning item's Trace and Play activities have been
 * completed at least once. Persisted to localStorage only — no accounts,
 * no cloud sync, matching the product's V1 local-only constraint. A single
 * module-level store (not React context) keeps this usable from anywhere,
 * exposed to components via `useProgress()` (React 19 `useSyncExternalStore`).
 */

import { useSyncExternalStore } from "react";
import type { LearningItem, WorldId } from "../types/content";

export type ActivityKind = "trace" | "play";

interface ItemProgress {
  trace?: boolean;
  play?: boolean;
}

type ProgressState = Partial<Record<WorldId, Record<string, ItemProgress>>>;

const STORAGE_KEY = "lla.progress.v1";

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function saveState(next: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing / storage quota — progress just won't persist across sessions.
  }
}

let state: ProgressState = loadState();
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): ProgressState {
  return state;
}

/** Marks one activity complete for one item. Idempotent, no-ops if already set. */
export function markComplete(worldId: WorldId, itemId: string, kind: ActivityKind): void {
  const worldProgress = state[worldId] ?? {};
  const itemProgress = worldProgress[itemId] ?? {};
  if (itemProgress[kind]) return;

  state = {
    ...state,
    [worldId]: {
      ...worldProgress,
      [itemId]: { ...itemProgress, [kind]: true },
    },
  };
  saveState(state);
  notify();
}

/** React hook: re-renders the calling component whenever progress changes. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function isActivityComplete(
  progress: ProgressState,
  worldId: WorldId,
  itemId: string,
  kind: ActivityKind,
): boolean {
  return Boolean(progress[worldId]?.[itemId]?.[kind]);
}

export function isItemFullyComplete(
  progress: ProgressState,
  worldId: WorldId,
  itemId: string,
): boolean {
  const item = progress[worldId]?.[itemId];
  return Boolean(item?.trace && item?.play);
}

export interface WorldProgressSummary {
  starsEarned: number;
  starsTotal: number;
  itemsFullyComplete: number;
  totalItems: number;
  isWorldComplete: boolean;
}

/** Two stars per item (Trace + Play) are the unit shown to the child. */
export function getWorldProgress(
  progress: ProgressState,
  worldId: WorldId,
  items: LearningItem[],
): WorldProgressSummary {
  let starsEarned = 0;
  let itemsFullyComplete = 0;
  const worldProgress = progress[worldId];

  for (const item of items) {
    const entry = worldProgress?.[item.id];
    if (entry?.trace) starsEarned++;
    if (entry?.play) starsEarned++;
    if (entry?.trace && entry?.play) itemsFullyComplete++;
  }

  const totalItems = items.length;
  return {
    starsEarned,
    starsTotal: totalItems * 2,
    itemsFullyComplete,
    totalItems,
    isWorldComplete: totalItems > 0 && itemsFullyComplete === totalItems,
  };
}

/** Aggregate stats across every world, for the Home screen's stat badges. */
export function getGlobalProgress(
  progress: ProgressState,
  worldItems: Record<WorldId, LearningItem[]>,
): { totalStars: number; worldsCompleted: number } {
  let totalStars = 0;
  let worldsCompleted = 0;

  for (const worldId of Object.keys(worldItems) as WorldId[]) {
    const summary = getWorldProgress(progress, worldId, worldItems[worldId]);
    totalStars += summary.starsEarned;
    if (summary.isWorldComplete) worldsCompleted++;
  }

  return { totalStars, worldsCompleted };
}
