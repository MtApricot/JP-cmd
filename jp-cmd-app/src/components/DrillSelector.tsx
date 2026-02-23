"use client";
import { useDrillStore } from "../store/drillStore";
import { DRILLS } from "../lib/drills";

const inputIcon = (token: string) => {
  switch (token) {
    // 方向（jp-cmd-master.json の表記に合わせる）
    case "Up": return "↑";
    case "Down": return "↓";
    case "Left": return "←";
    case "Right": return "→";
    case "Up+Left": return "↖";
    case "Up+Right": return "↗";
    case "Down+Left": return "↙";
    case "Down+Right": return "↘";

    // ボタン
    case "LightPunch": return "●";
    case "MediumPunch": return "●●";
    case "HeavyPunch": return "●●●";
    case "LightKick": return "○";
    case "MediumKick": return "○○";
    case "HeavyKick": return "○○○";
    case "Punch": return "拳";
    case "Kick": return "蹴";
    case "LightPunch_or_MediumPunch": return "LP/MP";
    default: return token;
  }
};

export default function DrillSelector() {
  const { drillType, setDrillType, selectedMoveIndex, setSelectedMoveIndex } =
    useDrillStore();

  const selectorDrill = DRILLS.find((d) => d.id === drillType);

  return (
    <section className="drill-selector">
      <h3>ドリル選択</h3>

      <div className="drill-list">
        {DRILLS.map((drill) => (
          <button
            key={drill.id}
            type="button"
            className={drillType === drill.id ? "active" : ""}
            onClick={() => setDrillType(drill.id)}
          >
            {drill.label}（{drill.moves.length}）
          </button>
        ))}
      </div>

      {selectorDrill && (
        <div className="move-list">
          {selectorDrill.moves.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className={`move-card ${selectedMoveIndex === i ? "active" : ""}`}
              onClick={() => setSelectedMoveIndex(i)}
            >
              <div className="move-name">{m.name}</div>

              {/* 通常技/必殺技などの input 表示 */}
              {m.input && m.input.length > 0 && (
                <div className="move-inputs">
                  {m.input.map((input, idx) => (
                    <span key={`${input}-${idx}`} className="input-token">
                      {inputIcon(input)}
                    </span>
                  ))}
                </div>
              )}

              {/* コンボの recipe 表示 */}
              {m.recipe && (
                <div className="combo-recipe">
                  {m.recipe.map((step, idx) => (
                    <div key={idx} className="combo-step">
                      <span className="combo-label">{step.label ?? ""}</span>
                      <span className="combo-key">
                        {step.key ?? (step.flow ? step.flow.join(" → ") : "")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {m.tips && <div className="combo-tips">{m.tips}</div>}
              {m.status_after && <div className="combo-status">{m.status_after}</div>}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
