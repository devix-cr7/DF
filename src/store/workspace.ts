import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryEntry {
  id: string;
  toolId: string;
  ts: number;
}

interface WorkspaceState {
  openTabs: string[];
  activeTab: string;
  favorites: string[];
  recents: string[];
  historyLog: HistoryEntry[];
  openTool: (id: string) => void;
  closeTab: (id: string) => void;
  setActive: (id: string) => void;
  toggleFavorite: (id: string) => void;
  goDashboard: () => void;
  clearHistory: () => void;
}

export const useWorkspace = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      openTabs: [],
      activeTab: "dashboard",
      favorites: [],
      recents: [],
      historyLog: [],

      openTool: (id) => {
        const { openTabs, recents, historyLog } = get();
        set({
          openTabs: openTabs.includes(id) ? openTabs : [...openTabs, id],
          activeTab: id,
          recents: [id, ...recents.filter((r) => r !== id)].slice(0, 6),
          historyLog: [{ id: crypto.randomUUID(), toolId: id, ts: Date.now() }, ...historyLog].slice(0, 200),
        });
      },

      closeTab: (id) => {
        const { openTabs, activeTab } = get();
        const next = openTabs.filter((t) => t !== id);
        const wasActive = activeTab === id;
        set({
          openTabs: next,
          activeTab: wasActive ? next[next.length - 1] ?? "dashboard" : activeTab,
        });
      },

      setActive: (id) => set({ activeTab: id }),

      toggleFavorite: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((f) => f !== id)
            : [...favorites, id],
        });
      },

      goDashboard: () => set({ activeTab: "dashboard" }),

      clearHistory: () => set({ historyLog: [] }),
    }),
    { name: "devforge-workspace" }
  )
);
