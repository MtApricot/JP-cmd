import type { Keybinds } from "./storageTypes";

const normalizeKey = (key: string) => {
  if (key === " ") return "Space";
  return key;
};

export const dirToKeyBlocks = (token: string, binds: Keybinds) => {
  const dirMap: Record<string, string[]> = {
    Up: [binds.up],
    Down: [binds.down],
    Left: [binds.left],
    Right: [binds.right],
    "Up+Left": [binds.up, binds.left],
    "Up+Right": [binds.up, binds.right],
    "Down+Left": [binds.down, binds.left],
    "Down+Right": [binds.down, binds.right],
  };
  return (dirMap[token] ?? []).map(normalizeKey);
};

export const btnToKeyBlock = (token: string, binds: Keybinds) => {
  const map: Record<string, string> = {
    LP: binds.lp,
    MP: binds.mp,
    HP: binds.hp,
    LK: binds.lk,
    MK: binds.mk,
    HK: binds.hk,
    LightPunch: binds.lp,
    MediumPunch: binds.mp,
    HeavyPunch: binds.hp,
    LightKick: binds.lk,
    MediumKick: binds.mk,
    HeavyKick: binds.hk,
    Punch: "P",
    Kick: "K",
    LightPunch_or_MediumPunch: `${binds.lp}/${binds.mp}`,
    HeavyPunch_or_MediumPunch: `${binds.hp}/${binds.mp}`,
    "HeavyPunch+HeavyKick": `${binds.hp}+${binds.hk}`,
    "MediumPunch+MediumKick": `${binds.mp}+${binds.mk}`,
  };
  return normalizeKey(map[token] ?? token);
};
