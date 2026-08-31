import { useMemo, useState } from "react";
import { ActivityShell } from "./ActivityShell";
import { Button, FeedbackBubble, ItemVisual } from "../ui";
import { markComplete } from "../../state/progress";
import { playAudio } from "../../audio/audioManifest";
import type { LearningItem, WorldMeta } from "../../types/content";

interface PlayActivityProps {
  world: WorldMeta;
  items: LearningItem[];
  startIndex: number;
  onExit: () => void;
}

function pickChoices(target: LearningItem, pool: LearningItem[]): LearningItem[] {
  const others = pool.filter((candidate) => candidate.id !== target.id);
  const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
  const distractors = shuffledOthers.slice(0, Math.min(2, shuffledOthers.length));
  return [target, ...distractors].sort(() => Math.random() - 0.5);
}

/**
 * Listen-and-match game: hear the target's name, then tap the matching
 * tile among a few choices. Reuses the same audio files and item data as
 * the rest of the app — no new audio, no new content. Wrong answers get a
 * gentle nudge and stay retryable; there is no failure state, matching a
 * preschool-appropriate "you can't lose" design.
 */
export function PlayActivity({ world, items, startIndex, onExit }: PlayActivityProps) {
  const [index, setIndex] = useState(startIndex);
  const [phase, setPhase] = useState<"active" | "success">("active");
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const item = items[index];
  const choices = useMemo(() => pickChoices(item, items), [item, items]);
  const hasNext = index < items.length - 1;

  async function handleListen() {
    if (!item.audio.word || playing) return;
    setPlaying(true);
    await playAudio(item.audio.word);
    setPlaying(false);
  }

  function handleChoice(choice: LearningItem) {
    if (phase !== "active") return;
    if (choice.id === item.id) {
      markComplete(world.id, item.id, "play");
      setWrongId(null);
      setPhase("success");
      return;
    }
    setWrongId(choice.id);
    window.setTimeout(() => setWrongId((current) => (current === choice.id ? null : current)), 600);
  }

  function handleNext() {
    setWrongId(null);
    setIndex((prev) => prev + 1);
    setPhase("active");
  }

  return (
    <ActivityShell
      title="Play"
      icon="🎮"
      world={world}
      index={index}
      total={items.length}
      phase={phase}
      successMessage={`Yay! That's ${item.label}!`}
      onClose={onExit}
      onNext={handleNext}
      hasNext={hasNext}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 shadow-card">
          <p className="font-display text-lg font-bold text-navy sm:text-xl">Which one is it?</p>
          <ItemVisual item={item} worldColor={world.color} size="lg" />
          <Button
            variant="accent"
            style={{ backgroundColor: world.color }}
            onClick={handleListen}
            disabled={playing}
            className={playing ? "animate-pulse" : undefined}
          >
            <span aria-hidden="true">🔊</span> Listen
          </Button>
        </div>

        {wrongId && <FeedbackBubble tone="gentle" message="Try again!" />}

        <div className="grid w-full max-w-md grid-cols-3 gap-3 sm:gap-4">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => handleChoice(choice)}
              aria-label={choice.label}
              className="flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl bg-white p-3 shadow-card transition-all duration-150 active:scale-95 sm:min-h-32"
              style={
                wrongId === choice.id
                  ? { boxShadow: "0 0 0 4px white, 0 0 0 7px var(--color-coral)" }
                  : undefined
              }
            >
              <ItemVisual item={choice} worldColor={world.color} size="sm" />
              <span className="font-display text-base font-bold text-navy sm:text-lg">
                {choice.primary}
              </span>
            </button>
          ))}
        </div>
      </div>
    </ActivityShell>
  );
}
