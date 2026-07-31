import { useMemo, useRef, type ElementType } from "react";
import { motion, useInView, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  stepDuration?: number;
  as?: ElementType;
};

export function BlurText({
  text,
  className,
  delay = 80,
  animateBy = "words",
  direction = "top",
  stepDuration = 0.35,
  as: Tag = "p",
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy],
  );

  const fromY = direction === "top" ? -18 : 18;

  const transition = (i: number): Transition => ({
    delay: (i * delay) / 1000,
    duration: stepDuration,
    ease: [0.22, 1, 0.36, 1],
  });

  return (
    <Tag ref={ref} className={cn("flex flex-wrap", className)} aria-label={text}>
      {elements.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={{
            opacity: 0,
            y: fromY,
            filter: "blur(8px)",
          }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: fromY, filter: "blur(8px)" }
          }
          transition={transition(i)}
          aria-hidden
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </Tag>
  );
}
