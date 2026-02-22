import { create } from 'zustand';
type Direction = | "neutral" | "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";
type Button = "P" | "K";

type InputFrame = {
    frame: number;
    dir: Direction;
    buttons: Button[];
};

type InputState = {
    currentDir: Direction;
    currentButtons: Button[];
    history: InputFrame[];
    
    setCurrentInput: (dir: Direction, buttons: Button[]) => void;
    pushHistory:(entry: InputFrame) => void;
    clearHistory: () => void;
};

const Max_History = 120; // 入力の最後の120フレームを保存す

export const useInputStore = create<InputState>((set) => ({
    currentDir: "neutral",
    currentButtons: [],
    history: [],

    setCurrentInput: (dir, buttons) => set({ currentDir: dir, currentButtons: buttons }),
    pushHistory: (entry) => set((state) => {
        const next = [...state.history, entry];
        const trimmed = next.length > Max_History ? next.slice(- Max_History) : next;
        return { history: trimmed };
    }),
    clearHistory: () => set({ history: [] }),
}));