"use client";

import { useTheme } from "@/components/ThemeProvider";

const LEAF_COLORS = [
  "#4A7C39",
  "#3D682B",
  "#284A1C",
  "#5E8E47",
  "#C8A850",
  "#A36B3B",
  "#466E33",
  "#D4B35A",
];
const SHAPES = ["leaf1", "leaf2", "flower", "petal", "petal", "leaf1"] as const;

const randomAt = (seed: number) => {
  let value = seed | 0;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
};

type Decoration = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: "leaf1" | "leaf2" | "flower" | "petal";
};

const decorations: Decoration[] = [0, 1, 2, 3].flatMap((row) => {
  const count = 72;
  const spacing = 1440 / count;

  return Array.from({ length: count }, (_, index) => {
    const seed = index * 37 + row * 139 + 11;
    return {
      x: index * spacing + (randomAt(seed) - 0.5) * spacing * 0.8 + (row % 2) * spacing * 0.35,
      y: 94 + row * 19 + (randomAt(seed + 1) - 0.5) * 14,
      rotation: randomAt(seed + 2) * 360 - 180,
      scale: 0.35 + randomAt(seed + 3) * 0.22,
      color: LEAF_COLORS[Math.floor(randomAt(seed + 4) * LEAF_COLORS.length)],
      shape: SHAPES[Math.floor(randomAt(seed + 5) * SHAPES.length)],
    };
  });
});

const smoothVariation = (step: number, seed: number, span: number, amplitude: number) => {
  const segment = Math.floor(step / span);
  const progress = step / span - segment;
  const eased = progress * progress * (3 - 2 * progress);
  const sample = (index: number) =>
    Math.round((randomAt(seed + index) * 2 - 1) * amplitude * 100) / 100;
  return sample(segment) + (sample(segment + 1) - sample(segment)) * eased;
};

const ridgeY = (step: number) =>
  108 + smoothVariation(step, 410, 4, 6) + smoothVariation(step, 820, 2, 1.5);

const createRidge = (offset = 0) => {
  const points = Array.from({ length: 36 }, (_, index) => {
    const startX = index * 40;
    const endX = startX + 40;
    return `Q ${startX + 20} ${ridgeY(index + 0.5) + offset} ${endX} ${ridgeY(index + 1) + offset}`;
  }).join(" ");
  return `M0 ${ridgeY(0) + offset} ${points}`;
};

const greenBottomY = (step: number) =>
  178 + smoothVariation(step, 1210, 5, 4) + smoothVariation(step, 1640, 2, 1.2);
const brownBottomY = (step: number) =>
  232 + smoothVariation(step, 2210, 5, 6) + smoothVariation(step, 2640, 2, 1.5);

const createBottomEdge = (getY: (step: number) => number) =>
  Array.from({ length: 36 }, (_, index) => {
    const step = 35 - index;
    const startX = (step + 1) * 40;
    const endX = step * 40;
    return `Q ${startX - 20} ${getY(step + 0.5)} ${endX} ${getY(step)}`;
  }).join(" ");

const bedRidge = createRidge();

const foreground: Decoration[] = Array.from({ length: 32 }, (_, index) => {
  const seed = 900 + index * 43;
  const spacing = 1440 / 32;
  return {
    x: index * spacing + (randomAt(seed) - 0.5) * spacing * 0.75,
    y: 144 + randomAt(seed + 1) * 14,
    rotation: randomAt(seed + 2) * 360 - 180,
    scale: 0.34 + randomAt(seed + 3) * 0.14,
    color: LEAF_COLORS[Math.floor(randomAt(seed + 4) * LEAF_COLORS.length)],
    shape: SHAPES[Math.floor(randomAt(seed + 5) * SHAPES.length)],
  };
});

const soilMarks = Array.from({ length: 110 }, (_, index) => {
  const seed = 3200 + index * 29;
  return {
    x: randomAt(seed) * 1440,
    y: 187 + randomAt(seed + 1) * 31,
    size: 0.7 + randomAt(seed + 2) * 1.2,
    light: randomAt(seed + 3) > 0.72,
  };
});

const greenSoilPath = `${bedRidge} L1440 ${greenBottomY(36)} ${createBottomEdge(greenBottomY)} Z`;
const brownSoilPath = `${bedRidge} L1440 ${brownBottomY(36)} ${createBottomEdge(brownBottomY)} Z`;


export function LeafTransition() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const soil = dark ? "#304A28" : "#5C8041";
  const soilLine = dark ? "#456438" : "#789952";
  const brownSoil = dark ? "#60452F" : "#986641";

  return (
    <div
      className="relative z-20 -mt-28 md:-mt-36 h-48 md:h-60 pointer-events-none select-none"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>

          <symbol id="bed-leaf1" viewBox="-1 -1 2 2">
            <path d="M0-1C0.8-0.5 0.8 0.5 0 1C-0.8 0.5-0.8-0.5 0-1Z" fill="currentColor" />
            <path d="M0-0.8 0 0.8" fill="none" stroke="#D5C18A" strokeWidth="0.045" />
          </symbol>
          <symbol id="bed-leaf2" viewBox="-1 -1 2 2">
            <path d="M0-1C1-0.2 0.6 1-0.3 0.8C-0.3 0.4-0.4-0.3 0-1Z" fill="currentColor" />
          </symbol>
          <symbol id="bed-flower" viewBox="-20 -20 40 40">
            <g fill="currentColor">
              <ellipse cy="-11" rx="5.6" ry="10" />
              <ellipse cy="-11" rx="5.6" ry="10" transform="rotate(72)" />
              <ellipse cy="-11" rx="5.6" ry="10" transform="rotate(144)" />
              <ellipse cy="-11" rx="5.6" ry="10" transform="rotate(216)" />
              <ellipse cy="-11" rx="5.6" ry="10" transform="rotate(288)" />
            </g>
            <circle r="5.6" fill="#E8C55A" />
          </symbol>
          <symbol id="bed-petal" viewBox="-14 -14 28 28">
            <ellipse rx="4.9" ry="9.8" fill="currentColor" />
          </symbol>
          <clipPath id="topsoil-clip">
            <path d={greenSoilPath} />
          </clipPath>
        </defs>


        <path d={brownSoilPath} fill={brownSoil} />


        <path d={greenSoilPath} fill={soil} />
        <g clipPath="url(#topsoil-clip)">
          <path d={createRidge(30)} fill="none" stroke={soilLine} strokeWidth="3" />
          <path d={createRidge(52)} fill="none" stroke={dark ? "#24391F" : "#496B34"} strokeWidth="2.5" />
        </g>


        {soilMarks.map((mark, index) => (
          <ellipse
            key={`soil-${index}`}
            cx={mark.x}
            cy={mark.y}
            rx={mark.size * 0.75}
            ry={mark.size}
            fill={mark.light ? (dark ? "#8A6546" : "#B27D52") : dark ? "#493321" : "#70492E"}
          />
        ))}


        <g>
          {decorations.map((item, index) => (
            <g
              key={index}
              transform={`translate(${item.x} ${item.y}) rotate(${item.rotation}) scale(${item.scale})`}
            >
              <use
                href={`#bed-${item.shape}`}
                x={item.shape === "petal" ? "-10" : "-20"}
                y={item.shape === "petal" ? "-10" : "-20"}
                width={item.shape === "petal" ? "20" : "40"}
                height={item.shape === "petal" ? "20" : "40"}
                color={item.color}
              />
            </g>
          ))}


          {foreground.map((item, index) => (
            <g key={`front-${index}`} transform={`translate(${item.x} ${item.y}) rotate(${item.rotation}) scale(${item.scale})`}>
              <use
                href={`#bed-${item.shape}`}
                x={item.shape === "petal" ? "-10" : "-20"}
                y={item.shape === "petal" ? "-10" : "-20"}
                width={item.shape === "petal" ? "20" : "40"}
                height={item.shape === "petal" ? "20" : "40"}
                color={item.color}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
