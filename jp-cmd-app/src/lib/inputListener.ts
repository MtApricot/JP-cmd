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
    const up = keys.has(keybinds.up);
    const down = keys.has(keybinds.down);
    const left = keys.has(keybinds.left);
    const right = keys.has(keybinds.right);

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
    if (keys.has(keybinds.lp)) list.push(buttonMap.lp);
    if (keys.has(keybinds.lk)) list.push(buttonMap.lk);
    if (keys.has(keybinds.mp)) list.push(buttonMap.mp);
    if (keys.has(keybinds.mk)) list.push(buttonMap.mk);
    if (keys.has(keybinds.hp)) list.push(buttonMap.hp);
    if (keys.has(keybinds.hk)) list.push(buttonMap.hk);
    if (keybinds.throw && keys.has(keybinds.throw)) list.push(buttonMap.throw);
    if (keys.has(keybinds.impact)) list.push(buttonMap.impact);
    if (keys.has(keybinds.parry)) list.push(buttonMap.parry);
    return list;
};

export const attachInputListener = (keybinds: KeybindsLike) => {
    const onKeyDown = (e: KeyboardEvent) => {
        pressed.add(e.key);
        const dir = getDirection(pressed, keybinds);
        const buttons = getButtons(pressed, keybinds);
        useInputStore.getState().setCurrentInput(dir, buttons);
    };

    const onKeyUp = (e: KeyboardEvent) => {
        pressed.delete(e.key);
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