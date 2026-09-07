"use client";

import { useState, useEffect } from "react";

interface LeaderboardEntry {
  player: string;
  score: number;
  timeTaken?: string;
  wrongAnswers?: number;
}

export default function PresenterDashboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        
        // 🎯 PROPER SORTING LOGIC:
        // 1. Highest Score first
        // 2. Lowest Time Taken second (If scores are equal)
        // 3. Lowest Wrong Answers third (If score and time are equal)
        const sorted = (data || []).sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
          // ১. পয়েন্ট বেশি থাকলে সে আগে
          if (b.score !== a.score) {
            return b.score - a.score;
          }

          // ২. পয়েন্ট সমান হলে কম সময় নেওয়া ব্যক্তি আগে ("20s" -> 20)
          const timeA = parseInt(a.timeTaken?.replace("s", "") || "9999", 10);
          const timeB = parseInt(b.timeTaken?.replace("s", "") || "9999", 10);
          
          if (timeA !== timeB) {
            return timeA - timeB;
          }

          // ৩. টাইমও সমান হলে যার ভুল কম সে আগে
          const wrongA = a.wrongAnswers || 0;
          const wrongB = b.wrongAnswers || 0;
          return wrongA - wrongB;
        });

        setLeaderboard(sorted);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#070b14] text-white p-6 md:p-10 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-amber-400 flex items-center gap-3">
            Live Presenter Dashboard 🎮
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Scan QR Code on mobile to play live
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl text-center">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
            Connected Players
          </span>
          <span className="text-3xl font-black text-amber-400">
            {leaderboard.length}
          </span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: QR Code Box */}
        <div className="lg:col-span-4 bg-[#0d1322] border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
          <div className="bg-white p-4 rounded-2xl mb-6 shadow-inner">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://bjet-quiz-app.vercel.app/play`}
              alt="Scan to play"
              className="w-60 h-60"
            />
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-amber-300 w-full overflow-hidden text-ellipsis">
            https://bjet-quiz-app.vercel.app/play
          </div>
        </div>

        {/* Right: Live Leaderboard Section */}
        <div className="lg:col-span-8 bg-[#0d1322] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl">
          <h2 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
            🏆 Live Leaderboard & Timing
          </h2>

          {leaderboard.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-20 text-gray-500 font-medium">
              Waiting for players to scan QR and join...
            </div>
          ) : (
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
              {leaderboard.map((item, index) => {
                const isWinner = index === 0;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-2xl transition-all duration-300 ${
                      isWinner
                        ? "bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border-2 border-amber-400 p-5 md:p-6 shadow-[0_0_25px_rgba(251,191,36,0.3)] scale-[1.02]"
                        : "bg-slate-900/80 border border-slate-800 p-4 text-gray-300 hover:border-slate-700"
                    }`}
                  >
                    {/* Left: Rank & Name */}
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div
                        className={`font-black flex items-center justify-center rounded-xl ${
                          isWinner
                            ? "w-12 h-12 text-2xl bg-amber-400 text-black shadow-lg shadow-amber-400/40"
                            : index === 1
                            ? "w-10 h-10 text-lg bg-slate-300 text-black"
                            : index === 2
                            ? "w-10 h-10 text-lg bg-amber-700 text-white"
                            : "w-10 h-10 text-base bg-slate-800 text-gray-400"
                        }`}
                      >
                        {isWinner ? "🥇" : `#${index + 1}`}
                      </div>

                      {/* Name & Winner Tag */}
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span
                          className={`font-bold ${
                            isWinner
                              ? "text-2xl text-white tracking-wide"
                              : "text-lg text-gray-200"
                          }`}
                        >
                          {item.player}
                        </span>

                        {/* WINNER TAG */}
                        {isWinner && (
                          <span className="inline-flex items-center gap-1 bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse shadow-md shadow-amber-400/30">
                            👑 Winner
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Wrong Answer Count, Score & Time */}
                    <div className="flex items-center gap-4 text-right">
                      {/* Red Wrong Counter Tag */}
                      {typeof item.wrongAnswers === "number" && item.wrongAnswers > 0 && (
                        <div className="bg-red-500/15 border border-red-500/40 text-red-400 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                          <span>❌</span>
                          <span>{item.wrongAnswers} Wrong</span>
                        </div>
                      )}

                      <div>
                        <div
                          className={`font-black ${
                            isWinner
                              ? "text-3xl text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]"
                              : "text-xl text-green-400"
                          }`}
                        >
                          {item.score} <span className="text-sm font-semibold text-gray-400">pts</span>
                        </div>
                        {item.timeTaken && (
                          <div className="text-xs text-gray-400 mt-0.5">
                            ⏱ {item.timeTaken}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}