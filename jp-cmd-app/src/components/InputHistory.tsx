"use client";
import { useInputStore } from "../store/inputStore";
import { useKeybindsStore } from "../store/keybindsStore";

const fmtKey = (k: string) => {
  const lower = k.toLowerCase();
  if (lower === "space") return "凵";
  if (lower === "leftshift") return "L⇧";
  if (lower.length === 1) return lower.toUpperCase();
  return k;
};

const dirToArrows = (dir: string) => {
  switch (dir) {
    case "up": return ["↑"];
    case "down": return ["↓"];
    case "left": return ["←"];
    case "right": return ["→"];
    case "up-left": return ["↑", "←"];
    case "up-right": return ["↑", "→"];
    case "down-left": return ["↓", "←"];
    case "down-right": return ["↓", "→"];
    default: return [];
  }
};

const buttonToKey = (b: string, binds: any) => {
  switch (b) {
    case "LP": return fmtKey(binds.lp);
    case "MP": return fmtKey(binds.mp);
    case "HP": return fmtKey(binds.hp);
    case "LK": return fmtKey(binds.lk);
    case "MK": return fmtKey(binds.mk);
    case "HK": return fmtKey(binds.hk);
    case "THROW": return fmtKey(binds.throw ?? "G");
    case "IMPACT": return fmtKey(binds.impact);
    case "PARRY": return fmtKey(binds.parry);
    default: return b;
  }
};

export default function InputHistory() {
  const history = useInputStore((state) => state.history);
  const binds = useKeybindsStore((s) => s.keybinds);

  return (
    <div className="input-log">
      {history.length === 0 && <div className="hist-empty-row">NO INPUT</div>}
      {[...history].reverse().map((h) => {
        const arrows = dirToArrows(h.dir);
        const buttons = h.buttons.map((b) => buttonToKey(b, binds));
        const hasInputs = arrows.length > 0 || buttons.length > 0;

        return (
          <div key={h.frame} className="hist-row">
            <div className="hist-blocks">
              {!hasInputs && <div className="hist-block">N</div>}
              {arrows.map((a, i) => (
                <div key={`d-${i}`} className="hist-block">{a}</div>
              ))}
              {buttons.map((bk, i) => (
                <div key={`b-${i}`} className="hist-block">{bk}</div>
              ))}
            </div>
            <div className="hist-frame">{h.duration}f</div>
          </div>
        );
      })}
    </div>
  );
}
