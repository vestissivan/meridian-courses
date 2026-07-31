import { Star, Clock, Users, ArrowUpRight } from "lucide-react";
import type { Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

export function CourseCard({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) {
  const openApplication = useUiStore((s) => s.openApplication);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-soft",
        "transition-[transform,box-shadow,border-color] duration-(--motion-fast) ease-(--ease-out)",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-card",
        className,
      )}
    >
      {/* accent edge */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-star transition-transform duration-300 ease-(--ease-out) group-hover:scale-x-100"
        aria-hidden
      />

      <div className="relative aspect-video overflow-hidden bg-bg-subtle shine-on-hover">
        <img
          src={course.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-ink/55 via-bg-ink/5 to-transparent opacity-80"
          aria-hidden
        />
        {course.badge ? (
          <span className="absolute left-3 top-3 rounded-full border border-fg-on-ink/10 bg-bg-ink/70 px-2.5 py-1 text-xs font-medium text-fg-on-ink shadow-soft backdrop-blur-sm">
            {course.badge}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-bg-elevated/95 px-2.5 py-1 text-xs font-semibold text-fg shadow-soft">
          {formatPrice(course.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-primary">
            {course.category}
          </span>
          <span className="rounded-full border border-border bg-bg px-2 py-0.5 text-xs font-medium text-fg-muted">
            {course.level}
          </span>
        </div>

        <h3 className="font-display text-xl leading-snug tracking-tight text-fg text-balance transition-colors group-hover:text-primary">
          {course.title}
        </h3>

        <p className="text-sm text-fg-muted">преподаватель {course.instructor}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-sm text-fg-muted">
          <span className="inline-flex items-center gap-1 font-medium text-fg">
            <Star className="h-3.5 w-3.5 fill-star text-star" aria-hidden />
            {course.rating}
            <span className="font-normal text-fg-subtle">({course.reviews})</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden />
            {course.students}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {course.duration}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            Подробнее
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          <Button
            size="sm"
            className="shrink-0"
            onClick={() => openApplication(course.id)}
          >
            Оставить заявку
          </Button>
        </div>
      </div>
    </article>
  );
}
