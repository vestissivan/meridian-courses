import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { courses } from "@/data/courses";
import { useApplicationsStore } from "@/store/applications";
import { useUiStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(80, "Слишком длинное имя"),
  email: z.string().trim().email("Некорректный email"),
  phone: z
    .string()
    .trim()
    .min(6, "Укажите телефон")
    .max(30, "Слишком длинный телефон")
    .regex(/^[+\d()\-\s]+$/, "Только цифры и + ( ) -"),
  courseId: z.string().min(1, "Выберите курс"),
  goal: z
    .string()
    .trim()
    .min(8, "Опишите цель чуть подробнее")
    .max(500, "До 500 символов"),
});

type FormValues = z.infer<typeof schema>;

export function ApplicationDialog() {
  const open = useUiStore((s) => s.applicationOpen);
  const courseId = useUiStore((s) => s.applicationCourseId);
  const closeApplication = useUiStore((s) => s.closeApplication);
  const openApplicationsPanel = useUiStore((s) => s.openApplicationsPanel);
  const addApplication = useApplicationsStore((s) => s.addApplication);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseId: courseId ?? courses[0]?.id ?? "",
      goal: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      name: "",
      email: "",
      phone: "",
      courseId: courseId ?? courses[0]?.id ?? "",
      goal: "",
    });
  }, [open, courseId, form]);

  function onSubmit(values: FormValues) {
    const course = courses.find((c) => c.id === values.courseId);
    addApplication({
      name: values.name,
      email: values.email,
      phone: values.phone,
      courseId: values.courseId,
      courseTitle: course?.title ?? values.courseId,
      goal: values.goal,
    });
    toast.success("Заявка отправлена", {
      description: "Мы свяжемся с вами в ближайшее время.",
      action: {
        label: "Мои заявки",
        onClick: () => openApplicationsPanel(),
      },
    });
    closeApplication();
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) closeApplication();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-bg-ink/45 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[70] w-[min(100%-1.5rem,32rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-border bg-bg-elevated p-5 shadow-card outline-none md:p-6",
            "max-h-[min(90dvh,44rem)] overflow-y-auto",
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-2xl tracking-tight text-fg">
                Оставить заявку
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-fg-muted">
                Заполните форму — менеджер подтвердит запись на курс.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Закрыть">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <Field
              label="Имя"
              error={form.formState.errors.name?.message}
            >
              <input
                {...form.register("name")}
                className={inputClass}
                placeholder="Анна Иванова"
                autoComplete="name"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Email"
                error={form.formState.errors.email?.message}
              >
                <input
                  {...form.register("email")}
                  type="email"
                  className={inputClass}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </Field>
              <Field
                label="Телефон"
                error={form.formState.errors.phone?.message}
              >
                <input
                  {...form.register("phone")}
                  type="tel"
                  className={inputClass}
                  placeholder="+7 900 000-00-00"
                  autoComplete="tel"
                />
              </Field>
            </div>

            <Field
              label="Курс"
              error={form.formState.errors.courseId?.message}
            >
              <select {...form.register("courseId")} className={inputClass}>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Цель обучения"
              error={form.formState.errors.goal?.message}
            >
              <textarea
                {...form.register("goal")}
                rows={3}
                className={cn(inputClass, "resize-y py-2.5")}
                placeholder="Например: сменить роль, прокачать SQL, собрать портфолио…"
              />
            </Field>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden />
                Ответ обычно в течение 1 рабочего дня
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeApplication}
                >
                  Отмена
                </Button>
                <ShimmerButton type="submit" className="px-5 py-2.5 text-sm">
                  Отправить заявку
                </ShimmerButton>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const inputClass =
  "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-700">{error}</span>
      ) : null}
    </label>
  );
}
