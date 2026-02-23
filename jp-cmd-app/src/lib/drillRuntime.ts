import type { Move } from "./drills";
import type { Button, Direction } from "../store/inputStore";

export type ButtonSpec =
  | { type: "all"; buttons: Button[] }
  | { type: "any"; buttons: Button[] };

export type Step = {
  dir: Direction;
  buttonSpec?: ButtonSpec;
};

const dirMap: Record<string, Direction> = {
  W: "up",
  S: "down",
  A: "left",
  D: "right",
  "W+A": "up-left",
  "W+D": "up-right",
  "S+A": "down-left",
  "S+D": "down-right",
  Up: "up",
  Down: "down",
  Left: "left",
  Right: "right",
  "Up+Left": "up-left",
  "Up+Right": "up-right",
  "Down+Left": "down-left",
  "Down+Right": "down-right",
};

const buttonMap: Record<string, ButtonSpec> = {
  LP: { type: "all", buttons: ["LP"] },
  MP: { type: "all", buttons: ["MP"] },
  HP: { type: "all", buttons: ["HP"] },
  LK: { type: "all", buttons: ["LK"] },
  MK: { type: "all", buttons: ["MK"] },
  HK: { type: "all", buttons: ["HK"] },
  LightPunch: { type: "all", buttons: ["LP"] },
  MediumPunch: { type: "all", buttons: ["MP"] },
  HeavyPunch: { type: "all", buttons: ["HP"] },
  LightKick: { type: "all", buttons: ["LK"] },
  MediumKick: { type: "all", buttons: ["MK"] },
  HeavyKick: { type: "all", buttons: ["HK"] },
  Punch: { type: "any", buttons: ["LP", "MP", "HP"] },
  Kick: { type: "any", buttons: ["LK", "MK", "HK"] },
  LightPunch_or_MediumPunch: { type: "any", buttons: ["LP", "MP"] },
  HeavyPunch_or_MediumPunch: { type: "any", buttons: ["HP", "MP"] },
};

const parseToken = (token: string) => {
  // 例: "Down+LightPunch" のような複合を分解
  if (!token.includes("+")) return { dir: dirMap[token], btn: buttonMap[token] };

  const parts = token.split("+");
  // 方向 + 方向（例: Down+Right）
  if (parts.length === 2 && dirMap[`${parts[0]}+${parts[1]}`]) {
    return { dir: dirMap[`${parts[0]}+${parts[1]}`], btn: undefined };
  }

  // 方向 + ボタン（例: Down+LightPunch / Right+MediumPunch）
  const dirPart = parts.find((p) => dirMap[p]);
  const btnPart = parts.find((p) => buttonMap[p]);
  return {
    dir: dirPart ? dirMap[dirPart] : undefined,
    btn: btnPart ? buttonMap[btnPart] : undefined,
  };
};

export const moveToSteps = (move: Move): Step[] => {
  const steps: Step[] = [];

  for (const token of move.input) {
    const parsed = parseToken(token);

    // 方向のみ
    if (parsed.dir && !parsed.btn) {
      steps.push({ dir: parsed.dir });
      continue;
    }

    // 方向 + ボタン
    if (parsed.dir && parsed.btn) {
      steps.push({ dir: parsed.dir, buttonSpec: parsed.btn });
      continue;
    }

    // ボタンのみ（方向が直前にある前提）
    if (parsed.btn) {
      if (steps.length === 0) {
        steps.push({ dir: "neutral", buttonSpec: parsed.btn });
      } else {
        steps[steps.length - 1] = {
          ...steps[steps.length - 1],
          buttonSpec: parsed.btn,
        };
      }
    }
  }

  return steps;
};

export const matchButtons = (pressed: Button[], spec?: ButtonSpec) => {
  if (!spec) return true;
  if (spec.type === "all") return spec.buttons.every((b) => pressed.includes(b));
  return spec.buttons.some((b) => pressed.includes(b));
};
