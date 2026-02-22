import KeybindPanel from "../components/KeybindPanel";
import InputHistory from "../components/InputHistory";

export default function Home() {
  return (
    <main style={{ display: "flex", gap: "24px", padding: "24px" }}>
      <KeybindPanel />
      <InputHistory />
    </main>
  );
}
