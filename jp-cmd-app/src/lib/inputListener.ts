import { useInputStore } from "../store/inputStore";
import type { Button } from "../store/inputStore";

type ButtonKey = "lp" | "lk" | "mp" | "mk" | "hp" | "hk" | "throw" | "impact" | "parry";

type KeybindsLike = {
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
    impact: string; // ドライブインパクト
    parry: string;  // ドライブパリィ
};

const pressed = new Set<string>();

const normalizeKey = (key: string) => (key === " " ? "space" : key.toLowerCase());
const buttonMap: Record<ButtonKey, Button> = {
    lp: "LP",
    lk: "LK",
    mp: "MP",
    mk: "MK",
    hp: "HP",
    hk: "HK",
    throw: "THROW",
    impact: "IMPACT",
    parry: "PARRY",
};

const getDirection = (keys: Set<string>, keybinds: KeybindsLike) => {
    const up = keys.has(normalizeKey(keybinds.up));
    const down = keys.has(normalizeKey(keybinds.down));
    const left = keys.has(normalizeKey(keybinds.left));
    const right = keys.has(normalizeKey(keybinds.right));

    if (up && left) return "up-left";
    if (up && right) return "up-right";
    if (down && left) return "down-left";
    if (down && right) return "down-right";
    if (up) return "up";
    if (down) return "down";
    if (left) return "left";
    if (right) return "right";
    return "neutral";
};

const getButtons = (keys: Set<string>, keybinds: KeybindsLike) => {
    const list: Button[] = [];
    if (keys.has(normalizeKey(keybinds.lp))) list.push(buttonMap.lp);
    if (keys.has(normalizeKey(keybinds.lk))) list.push(buttonMap.lk);
    if (keys.has(normalizeKey(keybinds.mp))) list.push(buttonMap.mp);
    if (keys.has(normalizeKey(keybinds.mk))) list.push(buttonMap.mk);
    if (keys.has(normalizeKey(keybinds.hp))) list.push(buttonMap.hp);
    if (keys.has(normalizeKey(keybinds.hk))) list.push(buttonMap.hk);
    if (keybinds.throw && keys.has(normalizeKey(keybinds.throw))) list.push(buttonMap.throw);
    if (keys.has(normalizeKey(keybinds.impact))) list.push(buttonMap.impact);
    if (keys.has(normalizeKey(keybinds.parry))) list.push(buttonMap.parry);
    return list;
};

export const attachInputListener = (keybinds: KeybindsLike) => {
    const onKeyDown = (e: KeyboardEvent) => {
        if (Object.values(keybinds).some((k) => normalizeKey(k) === normalizeKey(e.key))) {
            e.preventDefault();
        }
        pressed.add(normalizeKey(e.key));
        const dir = getDirection(pressed, keybinds);
        const buttons = getButtons(pressed, keybinds);
        useInputStore.getState().setCurrentInput(dir, buttons);
    };

    const onKeyUp = (e: KeyboardEvent) => {
         if (Object.values(keybinds).some((k) => normalizeKey(k) === normalizeKey(e.key))) {
            e.preventDefault();
        }
        pressed.delete(normalizeKey(e.key));
        const dir = getDirection(pressed, keybinds);
        const buttons = getButtons(pressed, keybinds);
        useInputStore.getState().setCurrentInput(dir, buttons);
    };
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
    };
};
