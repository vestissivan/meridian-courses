import { useEffect, useState } from "react";
import { Menu, X, Compass, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useApplicationsStore } from "@/store/applications";
import { useUiStore } from "@/store/ui";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#courses", label: "Курсы" },
  { href: "#paths", label: "Траектории" },
  { href: "#instructors", label: "Преподаватели" },
  { href: "#pricing", label: "Цены" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useApplicationsStore((s) => s.applications.length);
  const openApplicationsPanel = useUiStore((s) => s.openApplicationsPanel);
  const openApplication = useUiStore((s) => s.openApplication);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/90 bg-bg/85 shadow-soft backdrop-blur-xl"
          : "border-border/50 bg-bg/70 backdrop-blur-md",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <a href="#top" className="group flex items-center gap-2.5 font-medium tracking-tight">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-fg transition-transform duration-300 group-hover:rotate-12">
            <Compass className="h-4 w-4" strokeWidth={2.25} />
            <span className="absolute -inset-1 -z-10 rounded-lg bg-primary/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </span>
          <span className="text-lg tracking-tight">
            Meridian
            <span className="ml-1 hidden text-xs font-normal text-fg-subtle sm:inline">
              · learning
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium text-fg-muted transition-colors duration-(--motion-quick) hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={openApplicationsPanel}
          >
            <ClipboardList className="h-4 w-4" />
            Мои заявки
            {count > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-fg">
                {count}
              </span>
            ) : null}
          </Button>
          <ShimmerButton
            className="h-9 px-4 py-0 text-sm"
            shimmerDuration="2.2s"
            onClick={() => openApplication(null)}
          >
            Оставить заявку
          </ShimmerButton>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Мои заявки"
            onClick={openApplicationsPanel}
          >
            <ClipboardList className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-fg">
                {count}
              </span>
            ) : null}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-bg/95 backdrop-blur-md md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-3" aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3 text-base font-medium text-fg hover:bg-bg-subtle"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setOpen(false);
                openApplicationsPanel();
              }}
            >
              Мои заявки{count > 0 ? ` (${count})` : ""}
            </Button>
            <ShimmerButton
              className="w-full text-sm"
              onClick={() => {
                setOpen(false);
                openApplication(null);
              }}
            >
              Оставить заявку
            </ShimmerButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
