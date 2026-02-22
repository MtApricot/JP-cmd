import { create } from 'zustand';

type DrillType = "single" | "parts" | "combo" | "setup";

type DrillState = {
    drillType: DrillType;
    targetCount: number;
    successCount: number;
    failCount: number;

    setDrillType: (type: DrillType) => void;
    setTargetCount: (count: number) => void;
    incrementSuccess: () => void;
    incrementFail: () => void;
    resetProgress: () => void;
};

export const useDrillStore = create<DrillState>((set) => ({
    drillType: "single",
    targetCount: 10,
    successCount: 0,
    failCount: 0,

    setDrillType: (type) => set({ drillType: type }),
    setTargetCount: (count) => set({ targetCount: count }),
    incrementSuccess: () => set((state) => ({ successCount: state.successCount + 1 })),
    incrementFail: () => set((state) => ({ failCount: state.failCount + 1 })),
    resetProgress: () => set({ successCount: 0, failCount: 0 }),
}));