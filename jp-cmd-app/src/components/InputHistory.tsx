"use client";
import { useInputStore } from "../store/inputStore";

const dirIcon = (dir: string) => {
    switch (dir) {
        case "up": return "↑";
        case "down": return "↓";
        case "left": return "←";
        case "right": return "→";
        case "up-left": return "↖";
        case "up-right": return "↗";
        case "down-left": return "↙";
        case "down-right": return "↘";
        case "neutral": return "N";
        default: return "?";
    }
};

const buttonIcon = (b: string) => {
  switch (b) {
    case "LP": return "●";  // 弱P
    case "MP": return "●●"; // 中P
    case "HP": return "●●●"; // 強P
    case "LK": return "○";
    case "MK": return "○○";
    case "HK": return "○○○";
    case "THROW": return "投";
    case "IMPACT": return "DI";
    case "PARRY": return "DP";
    default: return b;
  }
};

export default function InputHistory() {
    const history = useInputStore((state) => state.history);
    return (
        <div className="input-log">
            {[...history].reverse().map((h) => (
                <div key={h.frame} className="input-row">
                    <span className="input-frame">{h.duration}</span>
                    <span className="input-direction">{dirIcon(h.dir)}</span>
                    <span className="input-buttons">
                        {h.buttons.map((b) => (
                            <span key={b} className="btn-icon">{buttonIcon(b)}</span>
                        ))}
                    </span>
                </div>
            ))}
        </div>
    );
}   