import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { WorldHeader, LearningTile, ResponsiveGrid, Button, StatBadge } from "../components/ui";
import { TraceActivity, PlayActivity } from "../components/activities";
import { getWorld, getWorldItems } from "../data/worlds";
import type { LearningItem, WorldId } from "../types/content";
import { playAudio } from "../audio/audioManifest";
import { useProgress, isItemFullyComplete, getWorldProgress } from "../state/progress";

type AudioKind = "word" | "phonics" | "phrase" | "sound";
type ActivityKind = "trace" | "play";

/**
 * Groups items into ordered categories when every item in the world shares
 * a `meta.category` (currently true only for First Words: Food, Home,
 * Nature, Things, People). Returns null for worlds with no category data,
 * so the caller falls back to a single flat grid.
 */
function groupByCategory(items: LearningItem[]): Array<[string, LearningItem[]]> | null {
  if (items.length === 0 || !items.every((item) => typeof item.meta?.category === "string")) {
    return null;
  }
  const order: string[] = [];
  const groups = new Map<string, LearningItem[]>();
  for (const item of items) {
    const category = item.meta!.category as string;
    if (!groups.has(category)) {
      groups.set(category, []);
      order.push(category);
    }
    groups.get(category)!.push(item);
  }
  return order.map((category) => [category, groups.get(category)!]);
}

export function WorldScreen() {
  const { worldId } = useParams<{ worldId: string }>();
  const world = getWorld(worldId as WorldId);
  const items = useMemo(() => (world ? getWorldItems(world.id) : []), [world]);
  const groupedItems = useMemo(() => groupByCategory(items), [items]);

  const [selected, setSelected] = useState<LearningItem | undefined>(items[0]);
  const [playingKind, setPlayingKind] = useState<AudioKind | null>(null);
  const [activity, setActivity] = useState<ActivityKind | null>(null);

  const progress = useProgress();

  if (!world) {
    return <Navigate to="/home" replace />;
  }

  const active = selected ?? items[0];
  const worldProgress = getWorldProgress(progress, world.id, items);

  function handleSelect(item: LearningItem) {
    setSelected(item);
    setPlayingKind(null);
  }

  async function handlePlay(kind: AudioKind) {
    if (!active) return;
    const path = active.audio[kind];
    if (!path) return;
    setPlayingKind(kind);
    await playAudio(path);
    setPlayingKind(null);
  }

  function renderTileGrid(worldItems: LearningItem[]) {
    return (
      <ResponsiveGrid className="sm:grid-cols-4 lg:grid-cols-6">
        {worldItems.map((item) => (
          <LearningTile
            key={item.id}
            item={item}
            accentColor={world!.color}
            selected={item.id === active?.id}
            complete={isItemFullyComplete(progress, world!.id, item.id)}
            onSelect={handleSelect}
          />
        ))}
      </ResponsiveGrid>
    );
  }

  const activeIndex = active ? items.findIndex((item) => item.id === active.id) : 0;

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <WorldHeader world={world} />

      <PageShell className="mt-6">
        <div className="mb-4 flex justify-center sm:justify-start">
          <StatBadge
            icon="⭐"
            label="World progress"
            value={`${worldProgress.starsEarned}/${worldProgress.starsTotal}`}
          />
        </div>

        {active && (
          <section
            aria-label="Selected item"
            className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-soft sm:p-10"
          >
            {active.colorHex ? (
              <span
                className="h-24 w-24 rounded-full shadow-pressed sm:h-32 sm:w-32"
                style={{ backgroundColor: active.colorHex }}
                aria-hidden="true"
              />
            ) : typeof active.meta?.count === "number" ? (
              <div
                className="flex max-w-xs flex-wrap justify-center gap-2 sm:max-w-sm"
                aria-hidden="true"
              >
                {Array.from({ length: active.meta.count }).map((_, index) => (
                  <span
                    key={index}
                    className="h-6 w-6 rounded-full shadow-pressed sm:h-8 sm:w-8"
                    style={{ backgroundColor: world.color }}
                  />
                ))}
              </div>
            ) : (
              <span className="text-7xl sm:text-8xl" aria-hidden="true">
                {active.emoji}
              </span>
            )}

            <div>
              <p className="font-display text-4xl font-extrabold text-navy sm:text-6xl">
                {active.primary}
              </p>
              {active.secondary && (
                <p className="font-display mt-1 text-lg font-bold text-navy-soft sm:text-2xl">
                  {active.secondary}
                </p>
              )}
              {typeof active.meta?.example === "string" && (
                <p className="mt-1 text-base font-semibold text-navy-soft">
                  {active.emoji} Like a {active.meta.example}!
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="accent"
                onClick={() => handlePlay("word")}
                disabled={playingKind === "word"}
                style={{ backgroundColor: world.color }}
                className={playingKind === "word" ? "animate-pulse" : undefined}
              >
                <span aria-hidden="true">🔊</span> Listen
              </Button>
              {active.audio.phonics && (
                <Button
                  variant="soft"
                  onClick={() => handlePlay("phonics")}
                  disabled={playingKind === "phonics"}
                  className={playingKind === "phonics" ? "animate-pulse" : undefined}
                >
                  <span aria-hidden="true">🔤</span> Phonics Sound
                </Button>
              )}
              {active.audio.phrase && (
                <Button
                  variant="soft"
                  onClick={() => handlePlay("phrase")}
                  disabled={playingKind === "phrase"}
                  className={playingKind === "phrase" ? "animate-pulse" : undefined}
                >
                  <span aria-hidden="true">📖</span> Example Phrase
                </Button>
              )}
              {active.audio.sound && (
                <Button
                  variant="soft"
                  onClick={() => handlePlay("sound")}
                  disabled={playingKind === "sound"}
                  className={playingKind === "sound" ? "animate-pulse" : undefined}
                >
                  <span aria-hidden="true">🐾</span>{" "}
                  {typeof active.meta?.sound === "string" ? active.meta.sound : "Animal Sound"}
                </Button>
              )}
              <Button variant="soft" onClick={() => setActivity("trace")}>
                <span aria-hidden="true">✏️</span> Trace
              </Button>
              <Button variant="soft" onClick={() => setActivity("play")}>
                <span aria-hidden="true">🎮</span> Play
              </Button>
            </div>
          </section>
        )}

        <section className="mt-8" aria-label={`${world.title} items`}>
          {groupedItems ? (
            <div className="flex flex-col gap-8">
              {groupedItems.map(([category, categoryItems]) => (
                <div key={category}>
                  <h2 className="font-display mb-3 text-sm font-bold uppercase tracking-wide text-navy-soft sm:text-base">
                    {category}
                  </h2>
                  {renderTileGrid(categoryItems)}
                </div>
              ))}
            </div>
          ) : (
            renderTileGrid(items)
          )}
        </section>
      </PageShell>

      {activity === "trace" && (
        <TraceActivity
          world={world}
          items={items}
          startIndex={Math.max(0, activeIndex)}
          onExit={() => setActivity(null)}
        />
      )}
      {activity === "play" && (
        <PlayActivity
          world={world}
          items={items}
          startIndex={Math.max(0, activeIndex)}
          onExit={() => setActivity(null)}
        />
      )}
    </div>
  );
}
