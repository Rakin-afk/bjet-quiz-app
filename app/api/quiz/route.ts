import { NextResponse } from 'next/server';

interface Player {
  name: string;
  score: number;
  timeTaken: number;
}

let playersStore: { [key: string]: Player } = {};

export async function GET() {
  const sortedPlayers = Object.values(playersStore).sort(
    (a, b) => b.score - a.score || a.timeTaken - b.timeTaken
  );
  return NextResponse.json({ players: sortedPlayers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, name, score, timeTaken } = body;

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const cleanName = name.trim();

    if (action === "join") {
      if (!playersStore[cleanName]) {
        playersStore[cleanName] = { name: cleanName, score: 0, timeTaken: 0 };
      }
    } else if (action === "submit") {
      if (playersStore[cleanName]) {
        playersStore[cleanName].score += score || 0;
        playersStore[cleanName].timeTaken += timeTaken || 0;
      }
    } else if (action === "reset") {
      playersStore = {};
    }

    return NextResponse.json({ success: true, players: Object.values(playersStore) });
  } catch (err) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 500 });
  }
}