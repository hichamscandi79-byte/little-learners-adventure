interface FeedbackBubbleProps {
  message: string;
  tone?: "positive" | "gentle";
}

const TONE_CLASSES: Record<NonNullable<FeedbackBubbleProps["tone"]>, string> = {
  positive: "bg-mint text-navy",
  gentle: "bg-yellow-soft text-navy",
};

/**
 * Shared positive-feedback UI. Phase 1 only demonstrates the visual —
 * real success/retry logic arrives with the mini-games in Phase 3.
 */
export function FeedbackBubble({ message, tone = "positive" }: FeedbackBubbleProps) {
  return (
    <div
      role="status"
      className={`font-display inline-flex items-center gap-2 rounded-full px-5 py-3 text-lg font-bold shadow-soft ${TONE_CLASSES[tone]}`}
    >
      <span aria-hidden="true">{tone === "positive" ? "🌟" : "💛"}</span>
      {message}
    </div>
  );
}
