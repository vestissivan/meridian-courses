import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ApplicationStatus = "new" | "in_review" | "contacted";

export type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  goal: string;
  createdAt: string;
  status: ApplicationStatus;
};

type ApplicationInput = {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  goal: string;
};

type ApplicationsState = {
  applications: Application[];
  addApplication: (input: ApplicationInput) => Application;
  removeApplication: (id: string) => void;
  clearApplications: () => void;
};

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      applications: [],
      addApplication: (input) => {
        const application: Application = {
          id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          ...input,
          createdAt: new Date().toISOString(),
          status: "new",
        };
        set({ applications: [application, ...get().applications] });
        return application;
      },
      removeApplication: (id) =>
        set({
          applications: get().applications.filter((item) => item.id !== id),
        }),
      clearApplications: () => set({ applications: [] }),
    }),
    { name: "meridian-applications" },
  ),
);
