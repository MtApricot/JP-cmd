"use client";
import { useDrillStore } from "../store/drillStore";
import { DRILLS } from "../lib/drills";
import { useKeybindsStore } from "../store/keybindsStore";
import { btnToKeyBlock, dirToKeyBlocks } from "../lib/keyDisplay";

const tokenToKeys = (token: string, binds: any) => {
  if (!token.includes("+")) {
    if (["Up", "Down", "Left", "Right"].includes(token)) {
      return dirToKeyBlocks(token, binds);
    }
    return [btnToKeyBlock(token, binds)];
  }

  const parts = token.split("+");
  const dirParts = parts.filter((p) => ["Up", "Down", "Left", "Right"].includes(p));
  const btnParts = parts.filter((p) => !dirParts.includes(p));

  const dirToken = dirParts.length > 1 ? `${dirParts[0]}+${dirParts[1]}` : dirParts[0] ?? "";
  const dirKeys = dirToken ? dirToKeyBlocks(dirToken, binds) : [];
  const btnKeys = btnParts.map((p) => btnToKeyBlock(p, binds));
  return [...dirKeys, ...btnKeys];
};

export default function DrillSelector() {
  const { drillType, setDrillType, selectedMoveIndex, setSelectedMoveIndex } =
    useDrillStore();
  const binds = useKeybindsStore((s) => s.keybinds);

  const selectorDrill = DRILLS.find((d) => d.id === drillType);

  return (
    <section className="drill-selector">
      <h3>ドリル選択</h3>

      <div className="drill-list">
        {DRILLS.map((drill) => {
          const count = drill.id === "combos" ? drill.combos?.length ?? 0 : drill.moves.length;
          return (
          <button
            key={drill.id}
            type="button"
            className={drillType === drill.id ? "active" : ""}
            onClick={() => setDrillType(drill.id)}
          >
            {drill.label}（{count}）
          </button>
          );
        })}
      </div>

      {selectorDrill && selectorDrill.id !== "combos" && (
        <div className="move-list">
          {selectorDrill.moves.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className={`move-card ${selectedMoveIndex === i ? "active" : ""}`}
              onClick={() => setSelectedMoveIndex(i)}
            >
              <div className="move-name">{m.name}</div>

              {m.input && m.input.length > 0 && (
                <div className="move-inputs">
                  {m.input.map((input, idx) => (
                    <span key={`${input}-${idx}`} className="input-token">
                      {tokenToKeys(input, binds).join(" ")}
                    </span>
                  ))}
                </div>
              )}
              {m.desc && <div className="combo-tips">{m.desc}</div>}
            </button>
          ))}
        </div>
      )}

      {selectorDrill && selectorDrill.id === "combos" && selectorDrill.combos && (
        <div className="move-list">
          {selectorDrill.combos.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={`move-card ${selectedMoveIndex === i ? "active" : ""}`}
              onClick={() => setSelectedMoveIndex(i)}
            >
              <div className="move-name">{c.title}</div>
              <div className="move-inputs">
                {c.sequence.map((input, idx) => (
                  <span key={`${input}-${idx}`} className="input-token">
                    {tokenToKeys(input, binds).join(" ")}
                  </span>
                ))}
              </div>
              {c.diff && <div className="combo-status">{c.diff}</div>}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
