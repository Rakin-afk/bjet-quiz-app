import { NextResponse } from "next/server";

let globalLeaderboard: { player: string; score: number; timeTaken: string; timestamp: string }[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { player, score, timeTaken } = body;

    if (player) {
      // নতুন প্লেয়ার বা ডাটা যুক্ত করে হাই-স্কোর অনুযায়ী সাজানো
      globalLeaderboard.push({
        player,
        score: Number(score) || 0,
        timeTaken: timeTaken || "0s",
        timestamp: new Date().toISOString(),
      });

      globalLeaderboard.sort((a, b) => b.score - a.score);
    }

    return NextResponse.json({ success: true, leaderboard: globalLeaderboard });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(globalLeaderboard);
}