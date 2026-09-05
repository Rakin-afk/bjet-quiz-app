"use client";

import { useState, useEffect, useRef } from "react";
import { QUIZ_QUESTIONS, Question } from "@/data/questions";

export default function PlayPage() {
  const [playerName, setPlayerName] = useState<string>("");
  const [hasEnteredName, setHasEnteredName] = useState<boolean>(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // নিখুঁত সময় ট্র্যাকিংয়ের জন্য Refs
  const startTimeRef = useRef<number>(0);
  const currentScoreRef = useRef<number>(0);

  const currentQuestion: Question = QUIZ_QUESTIONS[currentQuestionIndex];

  // টাইমার কাউন্টডাউন (প্রতি প্রশ্নের জন্য ১৫ সেকেন্ড)
  useEffect(() => {
    if (!hasEnteredName || isGameOver) return;

    if (timeRemaining === 0) {
      handleOptionSelect(""); // সময় শেষ হলে খালি উত্তর হিসেবে সাবমিট হবে
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isGameOver, hasEnteredName]);

  // নাম সাবমিট ও গেম টাইম স্টার্ট
  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setHasEnteredName(true);
      startTimeRef.current = Date.now(); // এক্সেক্ট স্টার্ট টাইম রেকর্ড করা হলো
    }
  };

  // উত্তর সিলেক্ট এবং নিখুঁত পয়েন্ট হিসেব
  const handleOptionSelect = (optionId: string) => {
    if (selectedOption !== null && optionId !== "") return;
    setSelectedOption(optionId);

    let updatedScore = currentScoreRef.current;

    // সঠিক উত্তর হলে পয়েন্ট যোগ হবে
    if (optionId === currentQuestion.correctOptionId) {
      const pointsGained = 100 + timeRemaining * 10;
      updatedScore += pointsGained;
      currentScoreRef.current = updatedScore;
      setScore(updatedScore);
    }

    setTimeout(() => {
      handleNextQuestion(updatedScore);
    }, 1000);
  };

  // পরবর্তী প্রশ্ন বা গেম ওভার এবং API-তে ১০০% এক্সেক্ট ডাটা সেন্ড
  const handleNextQuestion = async (finalScore: number) => {
    setSelectedOption(null);

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(15);
    } else {
      setIsGameOver(true);

      // ১. এক্সেক্ট মোট কত সেকেন্ড সময় লেগেছে তা বের করা
      const totalSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

      // ২. ফোনে দেখা পাওয়া ফাইনাল নম্বর ও নিখুঁত সময় API-তে পাঠানো
      try {
        await fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            player: playerName,
            score: finalScore, // ফোনের এক্সেক্ট স্কোর
            timeTaken: `${totalSeconds}s`, // আসল সময়
          }),
        });
      } catch (err) {
        console.error("Leaderboard submit error:", err);
      }
    }
  };

  // ১. নাম ইনপুট স্ক্রিন
  if (!hasEnteredName) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-2 text-yellow-400">🎮 Join BJET Quiz</h1>
          <p className="text-gray-400 mb-6 text-sm">Enter your name to start the challenge</p>

          <form onSubmit={handleStartGame} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your Name (e.g. Harmaini)"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition duration-200"
            >
              Start Game 🚀
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ২. গেম ওভার স্ক্রিন
  if (isGameOver) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <h1 className="text-3xl font-bold mb-2 text-yellow-400">🎉 Game Over!</h1>
          <p className="text-gray-400 text-lg mb-1">{playerName}</p>
          <p className="text-gray-300 text-sm mb-4">Your Final Score</p>
          <div className="text-5xl font-extrabold text-green-400 mb-6">{score} pts</div>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition"
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  // ৩. মূল গেম স্ক্রিন
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-2xl flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Player</span>
          <span className="text-lg font-bold text-yellow-400">{playerName}</span>
        </div>

        <div className="text-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Time Left</span>
          <span className={`text-2xl font-black ${timeRemaining <= 5 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}>
            {timeRemaining}s
          </span>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Score</span>
          <span className="text-lg font-bold text-green-400">{score} pts</span>
        </div>
      </div>

      <div className="w-full max-w-2xl my-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentQuestion.question_en}</h2>
        <p className="text-lg text-gray-400">{currentQuestion.question_jp}</p>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 my-auto">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.id === currentQuestion.correctOptionId;

          let btnStyle = "border-slate-800 bg-slate-900 hover:border-slate-700";
          if (selectedOption !== null) {
            if (isCorrect) {
              btnStyle = "border-green-500 bg-green-950/40 text-green-300";
            } else if (isSelected && !isCorrect) {
              btnStyle = "border-red-500 bg-red-950/40 text-red-300";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={selectedOption !== null}
              className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 text-left overflow-hidden ${btnStyle}`}
            >
              <div className="w-full h-32 md:h-40 rounded-xl overflow-hidden bg-slate-800 mb-3">
                <img
                  src={option.image}
                  alt={option.text}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-sm md:text-base text-gray-200">
                Option {option.id}: {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}