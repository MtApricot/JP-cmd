import { create } from 'zustand';
type Direction = "neutral" | "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";
export type Button = "LP" | "LK" | "MP" | "MK" | "HP" | "HK" | "THROW" | "IMPACT" | "PARRY";
type InputFrame = {
    frame: number;
    dir: Direction;
    buttons: Button[]; // 同時押しを配列で保持
};

type InputState = {
    currentDir: Direction;
    currentButtons: Button[]; // 現在同時に押されているボタン
    history: InputFrame[];
    frameCounter: number; // 自動採番用のカウンタ
    
    setCurrentInput: (dir: Direction, buttons: Button[]) => void;
    pushHistory: (dir: Direction, buttons: Button[]) => void;
    clearHistory: () => void;
    resetFrameCounter: () => void;
};

const MAX_HISTORY = 120; // 入力の最後の120フレームを保存す

export const useInputStore = create<InputState>((set, get) => ({
    currentDir: "neutral",
    currentButtons: [],
    history: [],
    frameCounter: 0,

    setCurrentInput: (dir, buttons) => set({ currentDir: dir, currentButtons: buttons }),
    pushHistory: (dir, buttons) => {
    const nextFrame = get().frameCounter + 1;
    const entry: InputFrame = {
      frame: nextFrame,
      dir,
      buttons,
    };

    set((state) => {
      const nextHistory = [...state.history, entry];
      const trimmed =
        nextHistory.length > MAX_HISTORY
          ? nextHistory.slice(-MAX_HISTORY)
          : nextHistory;

      return {
        history: trimmed,
        frameCounter: nextFrame,
      };
    });
  },
    clearHistory: () => set({ history: [] }),
    resetFrameCounter: () => set({ frameCounter: 0 }),
}));