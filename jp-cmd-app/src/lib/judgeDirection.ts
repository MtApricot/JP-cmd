export type Direction =
    | "neutral"
    | "up"
    | "down"
    | "left"
    | "right"
    | "up-left"
    | "up-right"
    | "down-left"
    | "down-right";

type FrameDir = {
    frame: number;
    dir: Direction;
};

type DirJudgeResult = {
    ok: boolean;
    reason?: string;
    details?: string
};

export const buildBufferHistory = (history: { frame: number; dir: Direction; duration: number }[], window = 5): FrameDir[] => {
    const buffer: FrameDir[] = [];
    for (let i = history.length - 1; i >= 0; i--) {
        const h = history[i];
        for (let j = 0; j < h.duration; j++) {
            buffer.unshift({ frame: h.frame - j, dir: h.dir });
            if (buffer.length >= window) {
                return buffer.reverse();
            }
        }
    }
    return buffer.reverse();
};

export const isDirection = (dir: Direction, target: Direction) => dir === target;

export const isBuffer = (buffer: FrameDir[], target: Direction, window = 5): boolean => {
    const recent = buffer.slice(-window);
    return recent.some((entry) => entry.dir === target);
}

export const checkDiagonal = (buffer: FrameDir[], from: Direction,
  to: Direction): DirJudgeResult => {
    const diagnal = from === "down" && to === "right" ? "down-right" :
        from === "down" && to === "left" ? "down-left" :
            from === "up" && to === "right" ? "up-right" :
                from === "up" && to === "left" ? "up-left" : null;
    if (!diagnal) return { ok: true };
        
    const fromIdx = buffer.findIndex((b) => b.dir === from);
    const toIdx = buffer.findIndex((b) => b.dir === to);
    if (fromIdx === -1 || toIdx === -1 || fromIdx >= toIdx) {
        return { ok: false, reason: "transition", details: "方向遷移が間違っています" };
    }

    const between = buffer.slice(fromIdx, toIdx + 1);
    const hasDiagonal = between.some((b) => b.dir === diagnal);
    return hasDiagonal ? { ok: true } : { ok: false, reason: "diagonal", details: "斜め入力が抜けています" };
};

export const checkDoubleDirection = (buffer: FrameDir[], target: Direction, maxGapF = 6): DirJudgeResult => {
    const targets = buffer.filter((b) => b.dir === target);
    if (targets.length < 2) {
        return { ok: false, reason: "count", details: `${target}入力が2回未満` };
    }
        const last = targets[targets.length - 1];
        const prev = targets[targets.length - 2];
        const gap = last.frame - prev.frame;
        if (gap > maxGapF) {
            return { ok: false, reason: "gap", details: `間隔が${gap}Fで長すぎる` };
        }

        return { ok: true };    
    };