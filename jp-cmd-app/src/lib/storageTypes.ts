export type Keybinds = {
    up: string;
    down: string;
    left: string;
    right: string;
    lp: string;
    lk: string;
    mp: string;
    mk: string;
    hp: string;
    hk: string;
    throw?: string;
};
export type Settings = {
    volume: number;
    showInputLogs: boolean;
};
export type Stats = {
    maxStreak: number;
    bestFrame: number;
};