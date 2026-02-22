import { create } from 'zustand';

type FeedbackState = {
    isSuccess: boolean | null; // 成功ならtrue、失敗ならfalse、未評価ならnull
    frameDiff: number | null; // 成功/失敗のフレーム差
    message: string; // フィードバックメッセージ

    setFeedback: (isSuccess: boolean, frameDiff: number | null, message: string) => void;
    clearFeedback: () => void;
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
    isSuccess: null,
    frameDiff: null,
    message: "",
    
    setFeedback: (isSuccess, frameDiff, message) => set({ isSuccess, frameDiff, message }),
    clearFeedback: () => set({ isSuccess: null, frameDiff: null, message: "" }),
}));