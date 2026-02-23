import type { Move } from "./drills";

export type DisplayBlock = {
    label: string;
    kind: "dir" | "btn" | "tech";
};

const tokenToLabel = (token: string): DisplayBlock => {
    switch (token) {
        case "Up": return { label: "↑", kind: "dir" };
        case "Down": return { label: "↓", kind: "dir" };
        case "Left": return { label: "←", kind: "dir" };
        case "Right": return { label: "→", kind: "dir" };
        case "Up+Left": return { label: "↖", kind: "dir" };
        case "Up+Right": return { label: "↗", kind: "dir" };
        case "Down+Left": return { label: "↙", kind: "dir" };
        case "Down+Right": return { label: "↘", kind: "dir" };
        case "LightPunch": return { label: "LP", kind: "btn" };
        case "MediumPunch": return { label: "MP", kind: "btn" };
        case "HeavyPunch": return { label: "HP", kind: "btn" };
        case "LightKick": return { label: "LK", kind: "btn" };
        case "MediumKick": return { label: "MK", kind: "btn" };
        case "HeavyKick": return { label: "HK", kind: "btn" };
        case "Parry": return { label: "DP", kind: "btn" };
        case "Impact": return { label: "Di", kind: "btn" };
        default: return { label: token, kind: "tech" };
    }
};

export const moveToBlocks = (move: Move): DisplayBlock[] => {
    return move.input.map(tokenToLabel);
}