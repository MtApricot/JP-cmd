"use client";
import { useEffect, useMemo, useState } from "react";
import { useKeybindsStore } from "../store/keybindsStore";

const FORBIDDEN_KEYS = new Set([",", ".", "/", "`", "-", "=", ";", "'", "[", "]", "Escape", "Tab", "Meta", "ContextMenu"]);

type KeyAction = keyof ReturnType<typeof useKeybindsStore.getState>["keybinds"];

export default function KeybindPanel() {
    const { keybinds, setKeybind, resetKeybinds } = useKeybindsStore();
    const [editingAction, setEditingAction] = useState<KeyAction | null>(null);
    const [tempKey, setTempKey] = useState("");

    const actionLabels = useMemo(() => ({
        up: "上",
        down: "下",
        left: "左",
        right: "右",
        lp: "弱P",
        lk: "弱K",
        mp: "中P",
        mk: "中K",
        hp: "強P",
        hk: "強K",
        throw: "投げ",
        impact: "ドライブインパクト",
        parry: "ドライブパリィ",
    }), []);

// 候補キーが他アクションに使われているか判定
    const conflictAction = useMemo(() => {
        if (!tempKey) return null;
        const found = Object.entries(keybinds).find(([action, key]) => key === tempKey && action !== editingAction);
        return found ? (found[0] as KeyAction) : null;
    }, [tempKey, keybinds, editingAction]);
    
    useEffect(() => {
        if (!editingAction) return;
        const onKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (FORBIDDEN_KEYS.has(key)) return;
            setTempKey(key);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [editingAction]);

    const handleSelect = (action: KeyAction) => {
        setEditingAction(action);
        setTempKey("");
    };

    const handleSave = () => {
        if (!editingAction || !tempKey) return;
        if (conflictAction) return; //競合時は保存不可
        setKeybind(editingAction, tempKey);
        setEditingAction(null);
        setTempKey("");
    };

    return (
        <section>
            <h2>キー設定</h2>
            <div>
                {Object.entries(keybinds).map(([action, key]) => (
                    <button
                        key={action}
                        type="button"
                        onClick={() => handleSelect(action as KeyAction)}>
                        {actionLabels[action as KeyAction]}: {key}
                    </button>
                ))}
            </div>
            <div>
                <p>選択中: {editingAction ?? "なし"}</p>
                <p>候補キー: {tempKey || "未入力"}</p>

                {conflictAction && (<p style={{ color: "red" }}>このキーは{actionLabels[conflictAction]}に使われています。別のキーを選んでください。</p>)}

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={!editingAction || !!conflictAction}>
                    保存
                </button>
                <button
                    type="button"
                    onClick={resetKeybinds}>リセット</button>
            </div>
        </section>
    );
}