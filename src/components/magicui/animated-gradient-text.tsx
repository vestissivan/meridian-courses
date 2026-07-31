import { cn } from "@/lib/utils";

type AnimatedGradientTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline animate-gradient bg-gradient-to-r from-primary via-fg to-primary bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        className,
      )}
      style={{ ["--bg-size" as string]: "300%" }}
    >
      {children}
    </span>
  );
}
