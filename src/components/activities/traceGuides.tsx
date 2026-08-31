import type { ReactNode } from "react";

const GUIDE_STROKE = "#c7cedd";
const GUIDE_PROPS = {
  fill: "none",
  stroke: GUIDE_STROKE,
  strokeWidth: 4,
  strokeDasharray: "8 10",
} as const;

const STAR_POINTS =
  "120,20 144.69,86.02 215.11,89.10 159.95,132.98 178.78,200.90 120,162 61.22,200.90 80.05,132.98 24.89,89.10 95.31,86.02";

const HEART_PATH =
  "M120,206 C120,206 20,146 20,86 C20,50 48,24 80,24 C100,24 116,36 120,54 C124,36 140,24 160,24 C192,24 220,50 220,86 C220,146 120,206 120,206 Z";

export interface TraceGuide {
  viewBoxWidth: number;
  viewBoxHeight: number;
  threshold: number;
  render: () => ReactNode;
}

function renderShapeOutline(shapeId: string): ReactNode {
  switch (shapeId) {
    case "circle":
      return <circle cx={120} cy={120} r={95} {...GUIDE_PROPS} />;
    case "square":
      return <rect x={25} y={25} width={190} height={190} rx={20} {...GUIDE_PROPS} />;
    case "triangle":
      return <polygon points="120,20 222,208 18,208" {...GUIDE_PROPS} />;
    case "rectangle":
      return <rect x={15} y={55} width={210} height={130} rx={16} {...GUIDE_PROPS} />;
    case "star":
      return <polygon points={STAR_POINTS} {...GUIDE_PROPS} />;
    case "heart":
      return <path d={HEART_PATH} {...GUIDE_PROPS} />;
    case "oval":
      return <ellipse cx={120} cy={120} rx={105} ry={68} {...GUIDE_PROPS} />;
    case "diamond":
      return <polygon points="120,15 225,120 120,225 15,120" {...GUIDE_PROPS} />;
    default:
      return <circle cx={120} cy={120} r={95} {...GUIDE_PROPS} />;
  }
}

/** A dashed shape outline to trace, e.g. for the Shapes world. */
export function buildShapeTraceGuide(shapeId: string): TraceGuide {
  return {
    viewBoxWidth: 240,
    viewBoxHeight: 240,
    threshold: 320,
    render: () => renderShapeOutline(shapeId),
  };
}

/** A dashed letter/digit/word outline to trace, sized to the text length. */
export function buildTextTraceGuide(text: string): TraceGuide {
  const width = Math.max(220, text.length * 130);
  const height = 220;
  return {
    viewBoxWidth: width,
    viewBoxHeight: height,
    threshold: Math.max(140, text.length * 140),
    render: () => (
      <text
        x={width / 2}
        y={height * 0.72}
        textAnchor="middle"
        fontFamily="'Baloo 2', 'Nunito', sans-serif"
        fontWeight={800}
        fontSize={height * 0.68}
        {...GUIDE_PROPS}
      >
        {text}
      </text>
    ),
  };
}
