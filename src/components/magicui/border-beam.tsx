import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BorderBeamProps = {
  children: ReactNode;
  className?: string;
  /** inner surface classes (must set background) */
  contentClassName?: string;
  /** seconds for one full loop */
  duration?: number;
};

/**
 * Wrapper: spinning conic gradient peeks through a 1.5px gap around the child.
 * Beam never draws on top of content.
 */
export function BorderBeam({
  children,
  className,
  contentClassName,
  duration = 6,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-[1.5px] shadow-card",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-[-50%] animate-[spin_var(--beam-duration)_linear_infinite] will-change-transform"
        style={
          {
            "--beam-duration": `${duration}s`,
            background:
              "conic-gradient(from 0deg, transparent 0 68%, color-mix(in oklab, var(--color-primary) 70%, transparent) 78%, var(--color-primary) 84%, var(--color-star) 90%, transparent 96%)",
          } as CSSProperties
        }
        aria-hidden
      />
      <div
        className={cn(
          "relative z-[1] h-full overflow-hidden rounded-[calc(1rem-1px)]",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
