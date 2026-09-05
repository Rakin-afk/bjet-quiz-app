"use client";

import React, { useState, useEffect } from "react";

interface Player {
  name: string;
  score: number;
  timeTaken: number;
}

export default function HostDashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const hostUrl = "http://192.168.0.41:3000/play";
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(hostUrl)}`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/quiz");
        const data = await res.json();
        if (data.players) {
          setPlayers(data.players);
        }
      } catch (e) {
        console.error("Failed to fetch live leaderboard", e);
      }
    };

    fetchLeaderboard();
    const timer = setInterval(fetchLeaderboard, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-amber-400">Live Presenter Dashboard 🎮</h1>
            <p className="text-slate-400 text-sm">Scan QR Code on mobile to play live</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-xl text-center">
            <span className="text-xs text-slate-400 block">Connected Players</span>
            <span className="text-2xl font-bold text-amber-400">{players.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="bg-white p-3 rounded-2xl border-4 border-amber-400 mb-4">
              <img src={qrImageUrl} alt="QR Code" width={180} height={180} className="rounded-lg" />
            </div>
            <p className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              {hostUrl}
            </p>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              🏆 Live Leaderboard & Timing
            </h2>

            {players.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                Waiting for players to scan QR and join...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-xs uppercase text-slate-400">
                      <th className="py-3 px-2">Rank</th>
                      <th className="py-3 px-2">Player</th>
                      <th className="py-3 px-2">Time Taken</th>
                      <th className="py-3 px-2 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {players.map((p, index) => (
                      <tr key={p.name} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-2 font-bold text-amber-400">#{index + 1}</td>
                        <td className="py-3 px-2 font-semibold text-slate-100">{p.name}</td>
                        <td className="py-3 px-2 text-xs font-mono text-slate-400">{p.timeTaken}s</td>
                        <td className="py-3 px-2 text-right font-black text-emerald-400">{p.score} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}