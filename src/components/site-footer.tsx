import { Compass, ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Обучение",
    links: ["Все курсы", "Траектории", "Сертификаты", "Для команд"],
  },
  {
    title: "Компания",
    links: ["О нас", "Карьера", "Пресса", "Контакты"],
  },
  {
    title: "Поддержка",
    links: ["Справка", "Доступность", "Статус", "Сообщество"],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg-ink text-fg-on-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 10% 0%, color-mix(in oklab, var(--color-primary) 30%, transparent), transparent 55%), radial-gradient(ellipse 40% 40% at 90% 100%, color-mix(in oklab, var(--color-star) 18%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-10" aria-hidden />

      <div className="container-page relative py-14 md:py-16">
        <div className="mb-12 flex flex-col gap-6 rounded-2xl border border-fg-on-ink/10 bg-fg-on-ink/[0.04] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-display text-2xl tracking-tight text-fg-on-ink">
              Готовы прокачать навык?
            </p>
            <p className="mt-1 text-sm text-fg-on-ink-muted">
              Карта → курс → заявка. Без лишней бюрократии.
            </p>
          </div>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 self-start rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-fg shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            К курсам
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-fg">
                <Compass className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="text-lg font-medium tracking-tight">Meridian</span>
            </div>
            <p className="text-sm leading-relaxed text-fg-on-ink-muted">
              Онлайн-курсы как сильный менторинг: ясные траектории, серьёзное
              ремесло и навыки, которые пригодятся уже в понедельник.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-fg-on-ink">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-fg-on-ink-muted transition-colors hover:text-fg-on-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-fg-on-ink/10 pt-6 text-sm text-fg-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Meridian Learning. Все права защищены.</p>
          <div className="flex gap-5">
            <a href="#top" className="hover:text-fg-on-ink">
              Конфиденциальность
            </a>
            <a href="#top" className="hover:text-fg-on-ink">
              Условия
            </a>
            <a href="#top" className="hover:text-fg-on-ink">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
