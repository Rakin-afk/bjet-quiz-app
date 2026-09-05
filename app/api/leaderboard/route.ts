import { NextResponse } from "next/server";

// মেমরিতে লিডারবোর্ড ডাটা রাখার জন্য (অথবা তোমার ডাটাবেস/Pusher লজিক থাকলে এখানে বসবে)
let leaderboardData: { player: string; score: number; timeTaken: string; timestamp: string }[] = [];

// ১. নতুন স্কোর সেভ করার জন্য
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { player, score, timeTaken } = body;

    if (!player) {
      return NextResponse.json({ error: "Player name is required" }, { status: 400 });
    }

    const newEntry = {
      player,
      score: Number(score) || 0,
      timeTaken: timeTaken || "0s",
      timestamp: new Date().toISOString(),
    };

    // তালিকায় যুক্ত করা এবং সর্বোচ্চ স্কোরের ভিত্তিতে সাজানো
    leaderboardData.push(newEntry);
    leaderboardData.sort((a, b) => b.score - a.score);

    return NextResponse.json({ success: true, leaderboard: leaderboardData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process score" }, { status: 500 });
  }
}

// ২. লিডারবোর্ডের ডাটা নেওয়ার জন্য
export async function GET() {
  return NextResponse.json(leaderboardData);
}