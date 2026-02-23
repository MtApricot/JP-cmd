"use client";
import { useDrillStore } from "../store/drillStore";
import { DRILLS } from "../lib/drills";

const inputIcon = (token: string) => {
    switch (token) {
        case "up": return "↑";
        case "down": return "↓";
        case "left": return "←";
        case "right": return "→";
        case "up-left": return "↖";
        case "up-right": return "↗";
        case "down-left": return "↙";
        case "down-right": return "↘";
        case "neutral": return "N";
        case "LP": return "●";  // 弱P
        case "MP": return "●●"; // 中P
        case "HP": return "●●●"; // 強P
        case "LK": return "○";
        case "MK": return "○○";
        case "HK": return "○○○";
        case "THROW": return "投";
        case "IMPACT": return "DI";
        case "PARRY": return "DP";
        default: return token;
    }
};

export default function DrillSelector() {
    const { drillType, setDrillType } = useDrillStore();
    const selectorDrill = DRILLS.find((d) => d.id === drillType)!;
    return (
        <section className="drill-selector">
            <h3>command選択</h3>
            <div className="drill-list" >
                {DRILLS.map((drill) => (
                    <button
                        key={drill.id}
                        type="button"
                        className={drillType === drill.id ? "active" : ""}
                        onClick={() => setDrillType(drill.id)}
                    >
                        {drill.label}({drill.moves.length})
                    </button>
                ))}
            </div>
            {selectorDrill.moves.map((m) => (
                <div key={m.name} className="move-card">
                    <div className="move-name">{m.name}</div>
                    <div className="move-inputs">
                        {m.input.map((input, i) => (
                            <span key={`${input}-${i}`} className="input-token">{inputIcon(input)}</span>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

