import * as Dialog from "@radix-ui/react-dialog";
import { ClipboardList, Trash2, X } from "lucide-react";
import {
  useApplicationsStore,
  type ApplicationStatus,
} from "@/store/applications";
import { useUiStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusLabel: Record<ApplicationStatus, string> = {
  new: "Новая",
  in_review: "В работе",
  contacted: "Связались",
};

export function ApplicationsPanel() {
  const open = useUiStore((s) => s.applicationsPanelOpen);
  const close = useUiStore((s) => s.closeApplicationsPanel);
  const openApplication = useUiStore((s) => s.openApplication);
  const applications = useApplicationsStore((s) => s.applications);
  const removeApplication = useApplicationsStore((s) => s.removeApplication);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-bg-ink/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-bg-elevated shadow-card outline-none",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight text-fg">
                Мои заявки
              </Dialog.Title>
              <Dialog.Description className="text-sm text-fg-muted">
                {applications.length
                  ? `${applications.length} ${pluralApplications(applications.length)}`
                  : "Пока пусто — оставьте первую заявку"}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Закрыть">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {applications.length === 0 ? (
              <div className="flex h-full min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-bg px-6 text-center">
                <ClipboardList className="mb-3 h-8 w-8 text-fg-subtle" />
                <p className="text-sm font-medium text-fg">Заявок пока нет</p>
                <p className="mt-1 text-sm text-fg-muted">
                  Выберите курс и нажмите «Оставить заявку».
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    close();
                    openApplication(null);
                  }}
                >
                  Новая заявка
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {applications.map((app) => (
                  <li
                    key={app.id}
                    className="rounded-xl border border-border bg-bg p-4 shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium leading-snug text-fg">
                          {app.courseTitle}
                        </p>
                        <p className="mt-1 text-sm text-fg-muted">
                          {app.name} · {app.email}
                        </p>
                        <p className="mt-0.5 text-sm text-fg-muted">{app.phone}</p>
                      </div>
                      <span className="shrink-0 rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {statusLabel[app.status]}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {app.goal}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-fg-subtle">
                      <time dateTime={app.createdAt}>
                        {new Date(app.createdAt).toLocaleString("ru-RU", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg"
                        onClick={() => removeApplication(app.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-border p-4">
            <Button
              className="w-full"
              onClick={() => {
                close();
                openApplication(null);
              }}
            >
              Оставить ещё заявку
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function pluralApplications(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "заявка";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "заявки";
  return "заявок";
}
