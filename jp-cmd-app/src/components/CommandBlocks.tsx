"use client";
import type { DisplayBlock } from "../lib/displayTokens";

export default function CommandBlocks({ blocks, showSeparators }: { blocks: DisplayBlock[], showSeparators?: boolean }) {
    return (
        <div className="command-row">
            {blocks.map((b, i) => (
                <div key={`${b.label}-${i}`} className={`cmd-block ${b.kind}`}>{b.label}</div>
            ))}{showSeparators && (<div className="command-sep">→</div>)}
        </div>
    );
}   