import { create } from 'zustand';
import type { DrillID } from '../lib/drills';

type DrillState = {
    drillType: DrillID;
    targetCount: number;
    successCount: number;
    failCount: number;
    selectedMoveIndex: number;
    stepIndex: number;

    setSelectedMoveIndex: (index: number) => void;
    nextStep: () => void;
    resetSteps: () => void;

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
    selectedMoveIndex: 0,
    stepIndex: 0,

    setSelectedMoveIndex: (index) => set({ selectedMoveIndex: index, stepIndex: 0 }),
    nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
    resetSteps: () => set({ stepIndex: 0 }),

    setDrillType: (type) => set({ drillType: type }),
    setTargetCount: (count) => set({ targetCount: count }),
    incrementSuccess: () => set((state) => ({ successCount: state.successCount + 1 })),
    incrementFail: () => set((state) => ({ failCount: state.failCount + 1 })),
    resetProgress: () => set({ successCount: 0, failCount: 0 }),
}));
