import { create } from "zustand";

type UiState = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  applicationCourseId: string | null;
  applicationOpen: boolean;
  openApplication: (courseId?: string | null) => void;
  closeApplication: () => void;
  applicationsPanelOpen: boolean;
  openApplicationsPanel: () => void;
  closeApplicationsPanel: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  applicationCourseId: null,
  applicationOpen: false,
  openApplication: (courseId = null) =>
    set({ applicationOpen: true, applicationCourseId: courseId }),
  closeApplication: () =>
    set({ applicationOpen: false, applicationCourseId: null }),
  applicationsPanelOpen: false,
  openApplicationsPanel: () => set({ applicationsPanelOpen: true }),
  closeApplicationsPanel: () => set({ applicationsPanelOpen: false }),
}));
