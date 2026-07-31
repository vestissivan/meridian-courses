import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Map,
  Search,
  Send,
} from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { SpotlightCard } from "@/components/magicui/spotlight-card";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Выбор навыка",
    body: "Карта или поиск — каталог сразу сужается под цель.",
    icon: Map,
  },
  {
    n: "02",
    title: "Заявка",
    body: "Короткая форма: контакты, цель и выбранная программа.",
    icon: Send,
  },
  {
    n: "03",
    title: "Старт",
    body: "Куратор отвечает в рабочий день и открывает доступ.",
    icon: BookOpen,
  },
];

export function BentoShowcase() {
  const openApplication = useUiStore((s) => s.openApplication);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineOn, setLineOn] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setLineOn(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative border-y border-border bg-bg-elevated py-16 md:py-24">
      <div className="container-page">
        <BlurFade>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary">
                <span className="h-px w-6 bg-primary" aria-hidden />
                Как устроено обучение
              </p>
              <h2 className="font-display text-3xl tracking-tight text-fg text-balance md:text-4xl">
                Три шага — без лишнего шума
              </h2>
              <p className="mt-3 text-base leading-relaxed text-fg-muted md:text-lg">
                Выбираете навык, оставляете заявку, получаете доступ. Всё
                остальное — на кураторе.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openApplication(null)}
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Оставить заявку
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </BlurFade>

        {/* Flow steps + soft draw line */}
        <div ref={lineRef} className="relative">
          {/* connector — desktop only, draws once in view */}
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-[2.15rem] hidden h-px md:block"
            aria-hidden
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-border">
              <div
                className={cn(
                  "h-full origin-left bg-gradient-to-r from-primary/30 via-primary to-primary/30 transition-transform duration-1000 ease-out",
                  lineOn ? "scale-x-100" : "scale-x-0",
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <BlurFade key={step.n} delay={0.1 * i}>
                  <article
                    className={cn(
                      "group relative h-full rounded-xl border border-border bg-bg p-6 shadow-soft",
                      "transition-[transform,box-shadow,border-color] duration-300",
                      "hover:-translate-y-1 hover:border-primary/25 hover:shadow-card",
                    )}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className={cn(
                          "relative z-[1] flex h-10 w-10 items-center justify-center rounded-full",
                          "border border-border bg-bg-elevated font-display text-sm text-fg",
                          "ring-4 ring-bg-elevated transition-colors duration-300",
                          "group-hover:border-primary/40 group-hover:text-primary",
                        )}
                      >
                        {step.n}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/8 text-primary transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {step.body}
                    </p>
                  </article>
                </BlurFade>
              );
            })}
          </div>
        </div>

        {/* Stats + actions */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <BlurFade delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-bg-ink p-6 text-fg-on-ink md:p-7">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-fg-on-ink-muted">
                <Compass className="h-3.5 w-3.5 text-primary" aria-hidden />
                В цифрах
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-display text-2xl tracking-tight md:text-3xl">
                    <NumberTicker value={2.4} decimalPlaces={1} suffix="M" />
                  </p>
                  <p className="mt-1 text-xs text-fg-on-ink-muted">учеников</p>
                </div>
                <div>
                  <p className="font-display text-2xl tracking-tight md:text-3xl">
                    <NumberTicker value={1200} suffix="+" />
                  </p>
                  <p className="mt-1 text-xs text-fg-on-ink-muted">курсов</p>
                </div>
                <div>
                  <p className="font-display text-2xl tracking-tight md:text-3xl">
                    <NumberTicker value={4.8} decimalPlaces={1} />
                  </p>
                  <p className="mt-1 text-xs text-fg-on-ink-muted">оценка</p>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.14} className="lg:col-span-7">
            <div className="grid h-full gap-4 sm:grid-cols-2">
              <SpotlightCard
                as="button"
                className="flex min-h-[140px] flex-col justify-between p-5"
                onClick={() => {
                  setSearchQuery("ИИ");
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Search className="h-4 w-4 text-primary" aria-hidden />
                <div>
                  <p className="text-base font-semibold tracking-tight text-fg">
                    Курсы по ИИ
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">
                    Открыть каталог с фильтром
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                as="button"
                className="flex min-h-[140px] flex-col justify-between p-5"
                onClick={() => openApplication(null)}
              >
                <Send className="h-4 w-4 text-primary" aria-hidden />
                <div>
                  <p className="text-base font-semibold tracking-tight text-fg">
                    Консультация
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">
                    Подберём программу под цель
                  </p>
                </div>
              </SpotlightCard>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.12}>
          <p className="mt-8 text-center text-sm text-fg-subtle">
            Выпускники работают в командах Yandex, Avito, T‑Bank, VK и Sber
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
