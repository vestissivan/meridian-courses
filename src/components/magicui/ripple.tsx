import { cn } from "@/lib/utils";

export function Ripple({
  className,
  mainCircleSize = 180,
  mainCircleOpacity = 0.22,
  numCircles = 6,
}: {
  className?: string;
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 56;
        const opacity = mainCircleOpacity - i * 0.03;
        const delay = i * 0.12;
        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full border border-primary/25 bg-primary/[0.03] shadow-[0_0_24px_color-mix(in_oklab,var(--color-primary)_12%,transparent)]"
            style={{
              width: size,
              height: size,
              opacity,
              animationDelay: `${delay}s`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
            }}
          />
        );
      })}
    </div>
  );
}
