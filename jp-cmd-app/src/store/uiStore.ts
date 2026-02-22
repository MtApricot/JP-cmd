import { create } from 'zustand';
type Panel = "keybind" | "stats" | "drill" | null;

type UIState = {
    activePanel: Panel;
    isMenuOpen: boolean;

    openPanel: (panel: Panel) => void;
    closePanel: () => void;
    toggleMenu: () => void;
};

export const useUIStore = create<UIState>((set) => ({
    activePanel: null,
    isMenuOpen: false,

    openPanel: (panel) => set({ activePanel: panel }),
    closePanel: () => set({ activePanel: null }),
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));