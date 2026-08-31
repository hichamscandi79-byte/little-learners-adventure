interface FeedbackBubbleProps {
  message: string;
  tone?: "positive" | "gentle";
}

const TONE_CLASSES: Record<NonNullable<FeedbackBubbleProps["tone"]>, string> = {
  positive: "bg-mint text-navy",
  gentle: "bg-yellow-soft text-navy",
};

/** Shared positive/gentle feedback pill used across the Trace and Play activities. */
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
