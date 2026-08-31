import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

interface Point {
  x: number;
  y: number;
}

interface TraceCanvasProps {
  viewBoxWidth: number;
  viewBoxHeight: number;
  guide: ReactNode;
  accentColor: string;
  completionThreshold: number;
  onThresholdReached: () => void;
}

function toPolylinePoints(points: Point[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(" ");
}

/**
 * A finger/mouse/stylus tracing surface: a dashed guide (letter, digit, word,
 * or shape outline, supplied by the caller) with a real drawing layer on top
 * captured via Pointer Events (works uniformly for touch, mouse, and pen,
 * including iOS Safari). Completion is judged by total drawn path length —
 * there is no handwriting/shape recognition — so a child genuinely has to
 * drag their finger across the guide for a sustained stroke, rather than the
 * activity auto-completing on a single tap.
 */
export function TraceCanvas({
  viewBoxWidth,
  viewBoxHeight,
  guide,
  accentColor,
  completionThreshold,
  onThresholdReached,
}: TraceCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drawingRef = useRef(false);
  const firedRef = useRef(false);

  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (currentStroke.length < 2) return;
    const a = currentStroke[currentStroke.length - 2];
    const b = currentStroke[currentStroke.length - 1];
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    setTotalLength((prev) => {
      const next = prev + distance;
      if (!firedRef.current && next >= completionThreshold) {
        firedRef.current = true;
        onThresholdReached();
      }
      return next;
    });
    // Only the newest point in the active stroke should ever contribute a
    // new segment; threshold/callback identity are stable for the lifetime
    // of one traced item (the parent remounts this component per item).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStroke]);

  function toSvgPoint(clientX: number, clientY: number): Point {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const transformed = point.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  }

  function handlePointerDown(event: PointerEvent<SVGSVGElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    setCurrentStroke([toSvgPoint(event.clientX, event.clientY)]);
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!drawingRef.current) return;
    const point = toSvgPoint(event.clientX, event.clientY);
    setCurrentStroke((prev) => {
      const last = prev[prev.length - 1];
      if (last && Math.hypot(point.x - last.x, point.y - last.y) < 1.5) return prev;
      return [...prev, point];
    });
  }

  function endStroke() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    setStrokes((prev) => {
      if (currentStroke.length < 2) return prev;
      return [...prev, currentStroke];
    });
    setCurrentStroke([]);
  }

  function handleClear() {
    setStrokes([]);
    setCurrentStroke([]);
    setTotalLength(0);
    firedRef.current = false;
  }

  const progressRatio = Math.min(1, totalLength / completionThreshold);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        role="img"
        aria-label="Tracing surface — drag your finger along the dashed outline"
        className="w-full touch-none select-none rounded-3xl bg-white shadow-card"
        style={{ aspectRatio: `${viewBoxWidth} / ${viewBoxHeight}`, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endStroke}
        onPointerCancel={endStroke}
        onPointerLeave={endStroke}
      >
        <g pointerEvents="none">{guide}</g>
        {strokes.map((stroke, index) => (
          <polyline
            key={index}
            points={toPolylinePoints(stroke)}
            fill="none"
            stroke={accentColor}
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        ))}
        {currentStroke.length > 1 && (
          <polyline
            points={toPolylinePoints(currentStroke)}
            fill="none"
            stroke={accentColor}
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          />
        )}
      </svg>

      <div className="h-3 w-full overflow-hidden rounded-full bg-white shadow-pressed" aria-hidden="true">
        <div
          className="h-full rounded-full transition-[width] duration-150 ease-out"
          style={{ width: `${progressRatio * 100}%`, backgroundColor: accentColor }}
        />
      </div>

      <button
        type="button"
        onClick={handleClear}
        className="font-display text-sm font-bold text-navy-soft underline underline-offset-4"
      >
        Clear and try again
      </button>
    </div>
  );
}
