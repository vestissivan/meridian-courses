import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: "div" | "article" | "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(15, 107, 99, 0.14)",
  as = "div",
  href,
  onClick,
  type = "button",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStyle({
      background: `radial-gradient(480px circle at ${x}px ${y}px, ${spotlightColor}, transparent 42%)`,
    });
  }

  function onLeave() {
    setStyle({ background: "transparent" });
  }

  const classes = cn(
    "group/card relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-soft transition-[transform,border-color,box-shadow] duration-(--motion-fast) ease-(--ease-out)",
    "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card",
    className,
  );

  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={style}
        aria-hidden
      />
      <div className="relative z-[1] h-full">{children}</div>
    </>
  );

  if (as === "button") {
    return (
      <button
        type={type}
        className={cn(classes, "w-full text-left")}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        ref={ref as never}
      >
        {content}
      </button>
    );
  }

  if (as === "a" && href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        ref={ref as never}
      >
        {content}
      </a>
    );
  }

  const Tag = as === "article" ? "article" : "div";
  return (
    <Tag
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={ref as never}
      onClick={onClick}
    >
      {content}
    </Tag>
  );
}
