"use client";
import { useStatsStore } from "../store/statsStore";

export default function StatsPanel() {
    const stats = useStatsStore((s) => s.stats);
    return (
        <section className="stats-panel">
            <h3>統計</h3>
            <p>最大連続成功: {stats.maxStreak}</p>
            <p>最短フレーム: {stats.bestFrames}</p>
        </section>
    );
}