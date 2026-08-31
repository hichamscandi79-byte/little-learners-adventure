import { useState } from "react";
import { ActivityShell } from "./ActivityShell";
import { TraceCanvas } from "./TraceCanvas";
import { buildShapeTraceGuide, buildTextTraceGuide, type TraceGuide } from "./traceGuides";
import { markComplete } from "../../state/progress";
import type { LearningItem, WorldMeta } from "../../types/content";

interface TraceActivityProps {
  world: WorldMeta;
  items: LearningItem[];
  startIndex: number;
  onExit: () => void;
}

function getTraceGuide(world: WorldMeta, item: LearningItem): TraceGuide {
  if (world.id === "shapes") {
    return buildShapeTraceGuide(item.id.replace("shape-", ""));
  }
  const text = world.id === "numbers" ? item.primary : item.label.toUpperCase();
  return buildTextTraceGuide(text);
}

function getTracePrompt(world: WorldMeta, item: LearningItem): string {
  if (world.id === "shapes") return `Trace the ${item.label} shape!`;
  if (world.id === "numbers") return `Trace ${item.primary} with your finger!`;
  return `Trace ${item.label} with your finger!`;
}

export function TraceActivity({ world, items, startIndex, onExit }: TraceActivityProps) {
  const [index, setIndex] = useState(startIndex);
  const [phase, setPhase] = useState<"active" | "success">("active");

  const item = items[index];
  const guide = getTraceGuide(world, item);
  const hasNext = index < items.length - 1;

  function handleThresholdReached() {
    markComplete(world.id, item.id, "trace");
    setPhase("success");
  }

  function handleNext() {
    setIndex((prev) => prev + 1);
    setPhase("active");
  }

  return (
    <ActivityShell
      title="Trace"
      icon="✏️"
      world={world}
      index={index}
      total={items.length}
      phase={phase}
      successMessage={`Great tracing, ${item.label}!`}
      onClose={onExit}
      onNext={handleNext}
      hasNext={hasNext}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-display text-lg font-bold text-navy sm:text-xl">
          {getTracePrompt(world, item)}
        </p>
        <TraceCanvas
          key={item.id}
          viewBoxWidth={guide.viewBoxWidth}
          viewBoxHeight={guide.viewBoxHeight}
          guide={guide.render()}
          accentColor={world.color}
          completionThreshold={guide.threshold}
          onThresholdReached={handleThresholdReached}
        />
      </div>
    </ActivityShell>
  );
}
