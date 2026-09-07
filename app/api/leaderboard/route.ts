import { NextResponse } from "next/server";

export interface PlayerScore {
  player: string;
  score: number;
  timeTaken?: string;
  wrongAnswers?: number;
}

// Global Memory Store for live game session
let leaderboardData: PlayerScore[] = [];

// GET method: Leaderboard data fetch করার জন্য
export async function GET() {
  return NextResponse.json(leaderboardData);
}

// POST method: Player score and wrong answer count update করার জন্য
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { player, score, timeTaken, wrongAnswers } = body;

    if (!player) {
      return NextResponse.json({ error: "Player name required" }, { status: 400 });
    }

    const existingIndex = leaderboardData.findIndex((p) => p.player === player);

    if (existingIndex !== -1) {
      // যদি প্লেয়ার আগে থেকেই তালিকায় থাকে, তবে তার স্কোর এবং ভুল উত্তরের সংখ্যা আপডেট হবে
      leaderboardData[existingIndex] = {
        player,
        score: score ?? leaderboardData[existingIndex].score,
        timeTaken: timeTaken ?? leaderboardData[existingIndex].timeTaken,
        wrongAnswers: wrongAnswers ?? leaderboardData[existingIndex].wrongAnswers ?? 0,
      };
    } else {
      // নতুন প্লেয়ার হলে এনট্রি যোগ হবে
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

// DELETE method: গেম রিসেট বা ক্লিয়ার করার প্রয়োজন পড়লে
export async function DELETE() {
  leaderboardData = [];
  return NextResponse.json({ success: true, message: "Leaderboard reset successfully" });
}