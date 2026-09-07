import { NextResponse } from "next/server";

export interface PlayerScore {
  player: string;
  score: number;
  timeTaken?: string;
  wrongAnswers?: number;
}

// 🛡️ Vercel Node.js Process Restart Protection
// globalThis ব্যবহার করায় Server Function re-execute হলেও আগের ডাটা মুছে যাবে না।
declare global {
  var __leaderboardStore: PlayerScore[] | undefined;
}

if (!globalThis.__leaderboardStore) {
  globalThis.__leaderboardStore = [];
}

const leaderboardData = globalThis.__leaderboardStore;

// GET: Leaderboard Data Fetch
export async function GET() {
  return NextResponse.json(leaderboardData, {
    headers: {
      // 🚀 Cache Disable করা হয়েছে যেন প্রতিটি Request-এ ফ্রেশ লাইভ ডাটা আসে
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

// POST: Add or Update Player Score
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { player, score, timeTaken, wrongAnswers } = body;

    if (!player) {
      return NextResponse.json({ error: "Player name required" }, { status: 400 });
    }

    const existingIndex = leaderboardData.findIndex(
      (p) => p.player.trim().toLowerCase() === player.trim().toLowerCase()
    );

    if (existingIndex !== -1) {
      // আগের প্লেয়ার থাকলে তথ্য আপডেট
      leaderboardData[existingIndex] = {
        player,
        score: score ?? leaderboardData[existingIndex].score,
        timeTaken: timeTaken ?? leaderboardData[existingIndex].timeTaken,
        wrongAnswers: wrongAnswers ?? leaderboardData[existingIndex].wrongAnswers ?? 0,
      };
    } else {
      // নতুন প্লেয়ার হলে যুক্ত হবে
      leaderboardData.push({
        player,
        score: score || 0,
        timeTaken: timeTaken || "0s",
        wrongAnswers: wrongAnswers || 0,
      });
    }

    return NextResponse.json({ success: true, leaderboard: leaderboardData });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 });
  }
}

// DELETE: আপনি চাইলে প্রেজেন্টেশনের আগে ম্যানুয়ালি রিসেট দেওয়ার জন্য এটি ব্যবহার করতে পারেন
export async function DELETE() {
  globalThis.__leaderboardStore = [];
  return NextResponse.json({ success: true, message: "Leaderboard Reset Successfully" });
}