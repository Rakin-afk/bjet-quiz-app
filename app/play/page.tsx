"use client";

import React, { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question_en: "What is the capital of Japan?",
    question_jp: "日本の首都は何ですか？",
    options: [
      { id: "A", text: "Osaka" },
      { id: "B", text: "Tokyo" },
      { id: "C", text: "Kyoto" },
      { id: "D", text: "Nagoya" },
    ],
    correctOptionId: "B",
  },
];

export default function PlayPage() {
  const [playerName, setPlayerName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const currentQuestion = QUESTIONS[0];

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault(); // মোবাইল কিবোর্ডের অটো-রিলোড ব্লক করবে
    const trimmed = playerName.trim();
    if (!trimmed) return;

    // ১. সাথে সাথে গেম স্ক্রিনে রিডাইরেক্ট
    setIsJoined(true);
    setStartTime(Date.now());

    // ২. ব্যাকগ্রাউন্ডে জয়েন রিকোয়েস্ট পাঠানো
    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "join", name: trimmed }),
    }).catch((e) => console.error("Join API Failed:", e));
  };

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return;

    setSelectedOption(optionId);
    const timeTaken = Number(((Date.now() - startTime) / 1000).toFixed(2));
    const isCorrect = optionId === currentQuestion.correctOptionId;
    const points = isCorrect ? Math.max(100 - Math.floor(timeTaken * 2), 10) : 0;

    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submit",
        name: playerName.trim(),
        score: points,
        timeTaken: timeTaken,
      }),
    }).catch((e) => console.error("Submit API Failed:", e));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
      {!isJoined ? (
        /* Step 1: Name Entry View with Form PreventDefault */
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-400">JP-BD Quiz</h1>
            <p className="text-sm text-slate-400 mt-1">Enter your name to play</p>
          </div>

          <form onSubmit={handleStartGame} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name (e.g. Rakin)"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-center font-medium focus:outline-none focus:border-amber-400"
              required
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-lg rounded-xl shadow-lg transition active:scale-95"
            >
              Start Quiz 🚀
            </button>
          </form>
        </div>
      ) : (
        /* Step 2: Live MCQ Screen */
        <div className="w-full max-w-md flex flex-col justify-between min-h-[80vh]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <p className="text-xs text-slate-400">Player</p>
              <p className="font-bold text-amber-400">{playerName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Question</p>
              <p className="font-bold">01 / 01</p>
            </div>
          </div>

          <div className="my-6 text-center space-y-2">
            <h2 className="text-xl font-bold text-white">{currentQuestion.question_en}</h2>
            <p className="text-amber-300 font-medium">{currentQuestion.question_jp}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-auto">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={selectedOption !== null}
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center font-bold text-base transition ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-lg scale-95"
                      : selectedOption !== null
                      ? "bg-slate-900 border-slate-800 text-slate-600 opacity-40"
                      : "bg-slate-900 border-slate-800 text-slate-200 active:bg-slate-800"
                  }`}
                >
                  <span className="text-xs text-slate-400 mb-1">Option {option.id}</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center pt-4">
            {selectedOption ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-3 rounded-xl font-semibold text-sm animate-pulse">
                ✓ Answer Submitted! Check Laptop Dashboard.
              </div>
            ) : (
              <p className="text-xs text-slate-500">Tap an option to submit</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}