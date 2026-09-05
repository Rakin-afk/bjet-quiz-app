export interface Option {
  id: string;
  text_en: string;
  text_jp?: string;
  image: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question_en: string;
  question_jp?: string;
  options: Option[];
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question_en: "Which one is the highest mountain in Japan?",
    question_jp: "にほん で いちばん たかい やま は どれ ですか？",
    options: [
      { id: "a", text_en: "Mount Fuji", text_jp: "ふじさん", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&q=80", isCorrect: true },
      { id: "b", text_en: "Sajek Valley", text_jp: "サジェク", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=500&q=80", isCorrect: false },
      { id: "c", text_en: "Mount Everest", text_jp: "エベレスト", image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=500&q=80", isCorrect: false },
      { id: "d", text_en: "Keokradong", text_jp: "ケオクラドン", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80", isCorrect: false }
    ]
  },
  {
    id: 2,
    question_en: "Which one is a traditional dish of Bangladesh?",
    question_jp: "バングラデシュ の つとうてきな たべもの は どれ ですか？",
    options: [
      { id: "a", text_en: "Sushi", text_jp: "すし", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80", isCorrect: false },
      { id: "b", text_en: "Kacchi Biryani", text_jp: "カッチ ビリヤニ", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80", isCorrect: true },
      { id: "c", text_en: "Ramen", text_jp: "ラーメン", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80", isCorrect: false },
      { id: "d", text_en: "Pizza", text_jp: "ピザ", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", isCorrect: false }
    ]
  },
  {
    id: 3,
    question_en: "What is the capital city of Japan?",
    question_jp: "にほん の しゅと は どこ ですか？",
    options: [
      { id: "a", text_en: "Tokyo", text_jp: "とうきょう", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80", isCorrect: true },
      { id: "b", text_en: "Dhaka", text_jp: "ダッカ", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80", isCorrect: false },
      { id: "c", text_en: "Kyoto", text_jp: "きょうと", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80", isCorrect: false },
      { id: "d", text_en: "Osaka", text_jp: "おおさか", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&q=80", isCorrect: false }
    ]
  }
];