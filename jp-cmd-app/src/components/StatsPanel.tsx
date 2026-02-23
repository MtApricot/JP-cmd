"use client";
import { useEffect, useState } from "react";
import { useStatsStore } from "../store/statsStore";

export default function StatsPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const stats = useStatsStore((s) => s.stats);
  if (!mounted) return null;

  return (
    <section className="stats-panel">
      <h3>統計</h3>
      <p>最大連続成功: {stats.maxStreak}</p>
      <p>最短フレーム: {stats.bestFrames}</p>
    </section>
  );
}
