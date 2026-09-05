"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

interface LeaderboardEntry {
  player: string;
  score: number;
  timeTaken: string;
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const playUrl = "https://bjet-quiz-app.vercel.app/play";

  // প্রতি ১ সেকেন্ড পর পর অটো ফেচ হবে
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data = await res.json();
          setLeaderboard(data);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            Live Presenter Dashboard 🎮
          </h1>
          <p className="text-gray-400 text-sm mt-1">Scan QR Code on mobile to play live</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 text-center">
          <span className="text-xs text-gray-400 block uppercase font-semibold">Connected Players</span>
          <span className="text-2xl font-bold text-yellow-400">{leaderboard.length}</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto">
        {/* Left: QR Code Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="bg-white p-4 rounded-2xl mb-6 shadow-inner">
            <QRCodeSVG value={playUrl} size={220} />
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-full text-xs font-mono text-gray-300 break-all">
            {playUrl}
          </div>
        </div>

        {/* Right: Live Leaderboard Box */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
            🏆 Live Leaderboard & Timing
          </h2>

          {leaderboard.length === 0 ? (
            <div className="my-auto text-center text-gray-500 py-12">
              Waiting for players to scan QR and join...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-gray-400 text-xs uppercase">
                    <th className="pb-3 px-4">Rank</th>
                    <th className="pb-3 px-4">Player</th>
                    <th className="pb-3 px-4 text-center">Time</th>
                    <th className="pb-3 px-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leaderboard.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition">
                      <td className="py-4 px-4 font-bold text-yellow-400">#{idx + 1}</td>
                      <td className="py-4 px-4 font-semibold text-white">{item.player}</td>
                      <td className="py-4 px-4 text-center text-gray-400 font-mono">{item.timeTaken}</td>
                      <td className="py-4 px-4 text-right font-bold text-green-400 text-lg">
                        {item.score} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}