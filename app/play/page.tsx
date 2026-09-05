"use client";

import { useState, useEffect } from "react";
import { QUIZ_QUESTIONS, Question } from "@/data/questions";

export default function PlayPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion: Question = QUIZ_QUESTIONS[currentQuestionIndex];

  // টাইমার লজিক (প্রতি সেকেন্ডে কমবে)
  useEffect(() => {
    if (isGameOver) return;

    if (timeRemaining === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isGameOver]);

  // উত্তর সিলেক্ট করার লজিক (Score Calculation Fix)
  const handleOptionSelect = (optionId: string) => {
    if (selectedOption !== null) return; // একবার সিলেক্ট করলে দ্বিতীয়বার সিলেক্ট করা যাবে না
    setSelectedOption(optionId);

    // ১. চেক করা হবে উত্তর সঠিক কি না
    if (optionId === currentQuestion.correctOptionId) {
      // সঠিক হলে: Base 100 + অবশিষ্ট সময়ের বোনাস পয়েন্ট
      const pointsGained = 100 + timeRemaining * 10;
      setScore((prevScore) => prevScore + pointsGained);
    } else {
      // ভুল হলে: ০ পয়েন্ট যোগ হবে
      console.log("Wrong answer! 0 points awarded.");
    }

    // ১ সেকেন্ড পর পরবর্তী প্রশ্নে যাবে
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  // পরবর্তী প্রশ্ন বা গেম শেষ করার লজিক
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setTimeRemaining(15); // পরের প্রশ্নের জন্য আবার ১৫ সেকেন্ড সেট হবে

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  if (isGameOver) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-yellow-400">🎉 Game Over!</h1>
          <p className="text-gray-300 text-lg mb-2">Your Final Score</p>
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

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 md:p-8">
      {/* Top Bar: Player Status & Timer */}
      <div className="w-full max-w-2xl flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Score</span>
          <span className="text-xl font-bold text-yellow-400">{score} pts</span>
        </div>

        <div className="text-center">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Time Left</span>
          <span className={`text-2xl font-black ${timeRemaining <= 5 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}>
            {timeRemaining}s
          </span>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Question</span>
          <span className="text-xl font-bold text-blue-400">
            {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Question Heading */}
      <div className="w-full max-w-2xl my-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentQuestion.question_en}</h2>
        <p className="text-lg text-gray-400">{currentQuestion.question_jp}</p>
      </div>

      {/* Options Grid */}
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