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

export default function Home() {
  const { activePanel, openPanel, closePanel } = useUIStore();

  const isKeybindOpen = activePanel === "keybind";
  const keybinds = useKeybindsStore((s) => s.keybinds);

  useEffect(() => {
    const detach = attachInputListener(keybinds);
    const stopLoop = stateFrameLoop();

    return () => {
      detach();
      stopLoop();
    };
  }, [keybinds]);
  return (
    <main className="app-main">
      <button className="settings-button" type="button" onClick={() => openPanel("keybind")}>
        設定
      </button>

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
      <button className="drill-button" type="button" onClick={() => openPanel("drill")}>
        command
      </button>
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
      <section className="layout">
        <aside className="col left">
          <InputHistory />
        </aside>
        <section className="col center">
          <div className="canvas">{/* 中央のコンテンツ（例: コマンドリストや動画プレイヤー）をここに配置 */}</div>
        </section>
        <aside className="col right">
          <StatsPanel />
        </aside>  
      </section>
    </main>
  );
}
