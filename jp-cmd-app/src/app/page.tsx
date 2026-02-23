"use client";
import { useEffect } from "react";
import KeybindPanel from "../components/KeybindPanel";
import InputHistory from "../components/InputHistory";
import StatsPanel from "../components/StatsPanel";
import { useUIStore } from "../store/uiStore";
import { stateFrameLoop } from "../lib/frameLoop";
import { attachInputListener } from "../lib/inputListener";
import { useKeybindsStore } from "../store/keybindsStore";
import DrillSelector from "../components/DrillSelector";
import { DRILLS } from "../lib/drills";
import { useDrillStore } from "../store/drillStore";
import { btnToKeyBlock, dirToKeyBlocks } from "../lib/keyDisplay";
import { useInputStore } from "../store/inputStore";
import { moveToSteps, matchButtons } from "../lib/drillRuntime";

export default function Home() {
  const { activePanel, openPanel, closePanel } = useUIStore();

  const isKeybindOpen = activePanel === "keybind";
  const keybinds = useKeybindsStore((s) => s.keybinds);
  const { currentDir, currentButtons } = useInputStore();
  const { drillType, selectedMoveIndex, setSelectedMoveIndex, stepIndex } = useDrillStore();
  const drill = DRILLS.find((d) => d.id === drillType);
  const move = drill?.moves[selectedMoveIndex];


  useEffect(() => {
    const detach = attachInputListener(keybinds);
    const stopLoop = stateFrameLoop();

    return () => {
      detach();
      stopLoop();
    };
  }, [keybinds]);
  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <div className="brand-text">JP DOJO</div>
        </div>
        <div />
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => openPanel("drill")}>
            コマンド
          </button>
          <button className="icon-button" type="button" onClick={() => openPanel("keybind")}>
            設定
          </button>
        </div>
      </header>

      {isKeybindOpen && (
        <div className="modal-overlay" onClick={() => closePanel()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => closePanel()}>
              ×
            </button>
            <KeybindPanel />
          </div>
        </div>
      )}

      {activePanel === "drill" && (
        <div className="modal-overlay" onClick={() => closePanel()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => closePanel()}>
              ×
            </button>
            <DrillSelector />
          </div>
        </div>
      )}

      <section className="app-main">
        <aside className="left-panel">
          <InputHistory />
        </aside>

        <section className="center-panel">
          <div className="target-label">TARGET SEQUENCE</div>
          <div className="command-row">
            {move &&
              (() => {
                const steps = moveToSteps(move);
                return steps.map((step, i) => {
                  const dirToken = step.dir
                    .replace("up-left", "Up+Left")
                    .replace("up-right", "Up+Right")
                    .replace("down-left", "Down+Left")
                    .replace("down-right", "Down+Right")
                    .replace("up", "Up")
                    .replace("down", "Down")
                    .replace("left", "Left")
                    .replace("right", "Right");

                  const dirKeys = dirToken === "neutral" ? [] : dirToKeyBlocks(dirToken, keybinds);
                  const btnKeys = step.buttonSpec
                    ? step.buttonSpec.buttons.map((b) => btnToKeyBlock(b, keybinds))
                    : [];

                  const isActiveStep =
                    i === stepIndex &&
                    currentDir === step.dir &&
                    matchButtons(currentButtons, step.buttonSpec);
                  const isDoneStep = i < stepIndex;

                  return (
                    <div key={`${step.dir}-${i}`} className="cmd-step">
                      <div className="cmd-group">
                        {dirKeys.map((k, idx) => (
                          <div
                            key={`d-${i}-${idx}`}
                            className={`cmd-block ${isDoneStep ? "done" : ""} ${
                              isActiveStep ? "active" : ""
                            }`}
                          >
                            {k}
                          </div>
                        ))}
                        {btnKeys.map((k, idx) => (
                          <div
                            key={`b-${i}-${idx}`}
                            className={`cmd-block ${isDoneStep ? "done" : ""} ${
                              isActiveStep ? "active" : ""
                            }`}
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                      {i < steps.length - 1 && <div className="cmd-sep">&gt;</div>}
                    </div>
                  );
                });
              })()}
          </div>
          <div className="ready-text">{stepIndex === 0 ? "READY" : ""}</div>
        </section>

        <aside className="right-panel">
          <StatsPanel />
        </aside>
      </section>
    </main>
  );
}
