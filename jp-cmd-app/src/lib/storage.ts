import type { Keybinds, Settings, Stats } from './storageTypes';

const KEY_KEYBINDS = 'keybinds';
const KEY_SETTINGS = 'settings';
const KEY_STATS = 'stats';

const isBrowser = () => typeof window !== 'undefined';

const safeParse = <T>(raw: string | null, fallback: T): T => {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
};

export const loadKeybinds = (fallback: Keybinds): Keybinds => {
    if (!isBrowser()) return fallback;
    return safeParse(localStorage.getItem(KEY_KEYBINDS), fallback);
}

export const saveKeybinds = (value: Keybinds) => {
    if (!isBrowser()) return;
    localStorage.setItem(KEY_KEYBINDS, JSON.stringify(value));
}

export const loadStats = (fallback: Stats): Stats => {
    if (!isBrowser()) return fallback;
    return safeParse<Stats>(localStorage.getItem(KEY_STATS), fallback);
}

export const saveStats = (value: Stats) => {
    if (!isBrowser()) return;
    localStorage.setItem(KEY_STATS, JSON.stringify(value));
}

export const loadSettings = (fallback: Settings): Settings => {
    if (!isBrowser()) return fallback;
    return safeParse<Settings>(localStorage.getItem(KEY_SETTINGS), fallback);
}

export const saveSettings = (value: Settings) => {
    if (!isBrowser()) return;
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(value));
}