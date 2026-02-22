import { create } from 'zustand';
import type { Settings } from '../lib/storageTypes';
import { loadSettings, saveSettings } from '../lib/storage';

// 設定のデフォルト値
const defaultSettings: Settings = {
    volume: 0.8,
    showInputLogs: true,
};

type SettingsState = {
    settings: Settings;
    setValue: (v: number) => void;
    toggleInputLogs: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
    // 初期値は LocalStorage から復元
    settings: loadSettings(defaultSettings),

    // 音量の更新と保存
    setValue: (v) => {
        set((state) => {
            const next = { ...state.settings, volume: v };
            saveSettings(next);
            return { settings: next };
        });
    },
    // 入力ログ表示の切り替えと保存
    toggleInputLogs: () => {
        set((state) => {
            const next = { ...state.settings, showInputLogs: !state.settings.showInputLogs };
            saveSettings(next);
            return { settings: next };
        });
    },
}));