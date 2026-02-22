import { create } from 'zustand';
import type { Keybinds } from '../lib/storageTypes';
import { loadKeybinds, saveKeybinds } from '../lib/storage';

const defaultKeybinds: Keybinds = {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D',
    lp: 'Y',
    lk: 'H',
    mp: 'U',
    mk: 'J',
    hp: 'I',
    hk: 'K',
    throw: 'G',
    impact: 'Space', 
    parry: "LeftShift",
};

type KeybindsState = {
    keybinds: Keybinds;
    setKeybind: (action: keyof Keybinds, key: string) => void;
    resetKeybinds: () => void;
};

export const useKeybindsStore = create<KeybindsState>((set) => ({
    // 初期値は LocalStorage から復元（なければ default）
    keybinds: loadKeybinds(defaultKeybinds),

    // 1つのキーを更新し、同時に LocalStorage に保存
    setKeybind: (action, key) => {
        set((state) => {
            const next = { ...state.keybinds, [action]: key };
            saveKeybinds(next);
            return { keybinds: next };
        });
    },
    // デフォルトに戻して LocalStorage も更新
    resetKeybinds: () => {
        saveKeybinds(defaultKeybinds);
        set({ keybinds: defaultKeybinds });
    },
}));