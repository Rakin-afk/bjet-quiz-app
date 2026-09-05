"use client";

import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "@/data/questions";

export default function PlayPage() {
  const [playerName, setPlayerName] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  // ৭টি প্রশ্নের সেট
  const questionsList = QUIZ_QUESTIONS.slice(0, 7);
  const currentQuestion = questionsList[currentIndex];

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = playerName.trim();
    if (!trimmed) return;

    const now = Date.now();
    setIsJoined(true);
    setQuizStartTime(now);
    setQuestionStartTime(now);
  };

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return;

    setSelectedOption(optionId);
    const now = Date.now();
    const qTimeTaken = (now - questionStartTime) / 1000;
    const isCorrect = optionId === currentQuestion.correctOptionId;
    const points = isCorrect ? Math.max(100 - Math.floor(qTimeTaken * 2), 10) : 0;

    const updatedScore = totalScore + points;
    setTotalScore(updatedScore);

    setTimeout(() => {
      if (currentIndex + 1 < questionsList.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setQuestionStartTime(Date.now());
      } else {
        // ৭টি প্রশ্ন শেষ হলে ব্যাকএন্ডে ড্যাশবোর্ডের জন্য ফাইনাল ডাটা পাঠানো হবে
        const totalDuration = Number(((Date.now() - quizStartTime) / 1000).toFixed(2));
        setIsFinished(true);

        fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "submit",
            name: playerName.trim(),
            score: updatedScore,
            timeTaken: totalDuration,
          }),
        }).catch((e) => console.error("Submit API Error:", e));
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
      {!isJoined ? (
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-400">JP-BD Quiz 🇧🇩🇯🇵</h1>
            <p className="text-sm text-slate-400 mt-1">Enter your name to start 7-question round</p>
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
      ) : isFinished ? (
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h1 className="text-2xl font-bold text-emerald-400">Quiz Completed!</h1>
          <p className="text-slate-300 text-sm">
            Awesome job, <span className="text-amber-400 font-bold">{playerName}</span>!
          </p>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
            <p className="text-xs text-slate-400">Total Score</p>
            <p className="text-3xl font-black text-amber-400">{totalScore} pts</p>
          </div>
          <p className="text-xs text-slate-500">Check the Presenter Dashboard on laptop for rankings.</p>
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col justify-between min-h-[85vh]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <p className="text-xs text-slate-400">Player</p>
              <p className="font-bold text-amber-400">{playerName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Question</p>
              <p className="font-bold text-amber-400">0{currentIndex + 1} / 07</p>
            </div>
          </div>

          <div className="my-4 text-center space-y-3">
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
              <img
                src={currentQuestion.image}
                alt="Question Visual"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-bold text-white">{currentQuestion.question_en}</h2>
            <p className="text-amber-300 text-sm font-medium">{currentQuestion.question_jp}</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 my-auto">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-xl border flex items-center justify-between font-bold text-sm transition ${
                    isSelected
                      ? option.id === currentQuestion.correctOptionId
                        ? "bg-emerald-500 text-slate-950 border-emerald-400 scale-95"
                        : "bg-rose-500 text-white border-rose-400 scale-95"
                      : selectedOption !== null
                      ? "bg-slate-900 border-slate-800 text-slate-600 opacity-40"
                      : "bg-slate-900 border-slate-800 text-slate-200 active:bg-slate-800"
                  }`}
                >
                  <span className="text-xs opacity-70">Option {option.id}</span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          <div className="text-center pt-2">
            {selectedOption ? (
              <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                ✓ Recorded! Moving to next question...
              </p>
            ) : (
              <p className="text-xs text-slate-500">Tap an option to select</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}