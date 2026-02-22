import { create } from 'zustand';
import type { Stats } from '../lib/storageTypes';
import { loadStats, saveStats } from '../lib/storage';

// 記録のデフォルト値
const defaultStats: Stats = {
    maxStreak: 0,
    bestFrames: 9999,
};

type StatsState = {
    stats: Stats;
    updateOnSuccess: (frames: number) => void;
    resetStats: () => void;
};

export const useStatsStore = create<StatsState>((set) => ({
    // 初期値は LocalStorage から復元
    stats: loadStats(defaultStats),

    // 成功時の更新
    updateOnSuccess: (frames) => {
        set((state) => {
                const next: Stats = {
                    maxStreak: state.stats.maxStreak + 1,
                    bestFrames: Math.min(state.stats.bestFrames, frames),
                };
                saveStats(next);
                return { stats: next };
            });
    },
    // 記録を初期化して保存
    resetStats: () => {
        saveStats(defaultStats);
        set({ stats: defaultStats });
    },
}));