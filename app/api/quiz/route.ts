import { NextResponse } from "next/server";

// global variable declaration for Vercel hot memory retention
const globalForQuiz = global as unknown as {
  quizPlayers: Array<{ name: string; score: number; timeTaken: number }>;
};

if (!globalForQuiz.quizPlayers) {
  globalForQuiz.quizPlayers = [];
}

export async function GET() {
  // শর্টিং করে পয়েন্ট বেশি এবং সময় কম অনুযায়ী ড্যাশবোর্ডে প্লেয়ার সাজানো হবে
  const sorted = [...globalForQuiz.quizPlayers].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTaken - b.timeTaken;
  });

  return NextResponse.json(
    { players: sorted },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, name, score, timeTaken } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (action === "submit") {
      const existingIndex = globalForQuiz.quizPlayers.findIndex(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      if (existingIndex > -1) {
        globalForQuiz.quizPlayers[existingIndex] = {
          name,
          score,
          timeTaken,
        };
      } else {
        globalForQuiz.quizPlayers.push({ name, score, timeTaken });
      }
    }

    return NextResponse.json(
      { success: true, players: globalForQuiz.quizPlayers },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}