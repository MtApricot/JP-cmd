import { useInputStore } from "../store/inputStore";

export default function InputHistory() {
    const history = useInputStore((state) => state.history);
    return (
        <div
            style={{
                maxHeight: "300px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                border: "1px solid #ccc",
                padding: "8px",
                gap: "4px",
            }}
        >
            {history.map((h) => (
            <div key={h.frame}>
                {h.frame}F | {h.dir} | {h.buttons.join("+")}
            </div>
            ))}
        </div>
    );
}   