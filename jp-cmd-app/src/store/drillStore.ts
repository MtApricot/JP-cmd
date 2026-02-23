import { create } from 'zustand';
import type { DrillID } from '../lib/drills';

type DrillState = {
    drillType: DrillID;
    targetCount: number;
    successCount: number;
    failCount: number;

    setDrillType: (type: DrillID) => void;
    setTargetCount: (count: number) => void;
    incrementSuccess: () => void;
    incrementFail: () => void;
    resetProgress: () => void;
};

export const useDrillStore = create<DrillState>((set) => ({
    drillType: "normal",
    targetCount: 10,
    successCount: 0,
    failCount: 0,

    setDrillType: (type) => set({ drillType: type }),
    setTargetCount: (count) => set({ targetCount: count }),
    incrementSuccess: () => set((state) => ({ successCount: state.successCount + 1 })),
    incrementFail: () => set((state) => ({ failCount: state.failCount + 1 })),
    resetProgress: () => set({ successCount: 0, failCount: 0 }),
}));