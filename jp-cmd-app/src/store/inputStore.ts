import { create } from 'zustand';
export type Direction = "neutral" | "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";
export type Button = "LP" | "LK" | "MP" | "MK" | "HP" | "HK" | "THROW" | "IMPACT" | "PARRY";
type InputFrame = {
    frame: number;
    dir: Direction;
    buttons: Button[]; // 同時押しを配列で保持
    duration: number;
};

type InputState = {
    currentDir: Direction;
    currentButtons: Button[]; // 現在同時に押されているボタン
    history: InputFrame[];
    archives: InputFrame[][];
    frameCounter: number; // 自動採番用のカウンタ
    
    setCurrentInput: (dir: Direction, buttons: Button[]) => void;
    pushHistory: (dir: Direction, buttons: Button[]) => void;
    archiveHistory: () => void;
    clearHistory: () => void;
    resetFrameCounter: () => void;
};

const MAX_HISTORY = 120; // 入力の最後の120フレームを保存す

export const useInputStore = create<InputState>((set, get) => ({
    currentDir: "neutral",
    currentButtons: [],
    history: [],
    archives: [],
    frameCounter: 0,

    setCurrentInput: (dir, buttons) => set({ currentDir: dir, currentButtons: buttons }),
  pushHistory: (dir, buttons) => {
    set((state) => {
      const last = state.history[state.history.length - 1];
    
      const same =
        last &&
        last.dir === dir &&
        last.buttons.length === buttons.length &&
        last.buttons.every((b) => buttons.includes(b));
      if (same && last.duration < MAX_HISTORY) {
        const nextHistory = [...state.history];
        nextHistory[nextHistory.length - 1] = {
          ...last,
          duration: last.duration + 1,
        };
        return { history: nextHistory };
      }
    
    const nextFrame = get().frameCounter + 1;
    const entry: InputFrame = {
      frame: nextFrame,
      dir,
      buttons,
      duration: 1,
    };
    const nextHistory = [...state.history, entry]; 
    return { history: nextHistory, frameCounter: nextFrame };
    });
  },
    archiveHistory: () =>
      set((state) => ({
        archives: [...state.archives, state.history],
      })),
    clearHistory: () => set({ history: [] }),
    resetFrameCounter: () => set({ frameCounter: 0 }),
}));