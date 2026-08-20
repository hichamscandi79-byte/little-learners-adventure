import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { WorldHeader, LearningTile, ResponsiveGrid, FeedbackBubble, Button } from "../components/ui";
import { getWorld, getWorldItems } from "../data/worlds";
import type { LearningItem, WorldId } from "../types/content";
import { playPlaceholderAudio } from "../audio/audioManifest";

export function WorldScreen() {
  const { worldId } = useParams<{ worldId: string }>();
  const world = getWorld(worldId as WorldId);
  const items = useMemo(() => (world ? getWorldItems(world.id) : []), [world]);

  const [selected, setSelected] = useState<LearningItem | undefined>(items[0]);
  const [toast, setToast] = useState<string | null>(null);

  if (!world) {
    return <Navigate to="/home" replace />;
  }

  const active = selected ?? items[0];

  function handleSelect(item: LearningItem) {
    setSelected(item);
    setToast(null);
  }

  function handleListen() {
    if (!active) return;
    playPlaceholderAudio(active.audio.word ?? "");
    setToast(null);
  }

  function handleComingSoon(feature: string) {
    setToast(`${feature} is coming in a future update!`);
  }

  return (
    <div className="min-h-dvh bg-cream pb-16">
      <WorldHeader world={world} />

      <PageShell className="mt-6">
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
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="accent"
                onClick={handleListen}
                style={{ backgroundColor: world.color }}
              >
                <span aria-hidden="true">🔊</span> Listen
              </Button>
              <Button variant="soft" onClick={() => handleComingSoon("Tracing")}>
                <span aria-hidden="true">✏️</span> Trace
              </Button>
              <Button variant="soft" onClick={() => handleComingSoon("Play")}>
                <span aria-hidden="true">🎮</span> Play
              </Button>
            </div>

            {toast && <FeedbackBubble tone="gentle" message={toast} />}
          </section>
        )}

        <section className="mt-8" aria-label={`${world.title} items`}>
          <ResponsiveGrid className="sm:grid-cols-4 lg:grid-cols-6">
            {items.map((item) => (
              <LearningTile
                key={item.id}
                item={item}
                accentColor={world.color}
                selected={item.id === active?.id}
                onSelect={handleSelect}
              />
            ))}
          </ResponsiveGrid>
        </section>
      </PageShell>
    </div>
  );
}
