export interface Question {
  id: number;
  question_en: string;
  question_jp: string;
  image: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  // Japan Related (3)
  {
    id: 1,
    question_en: "Which flag belongs to Japan?",
    question_jp: "日本の国旗はどれですか？",
    image: "https://images.unsplash.com/photo-1528164344705-47542687990d?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Red circle on white background 🇯🇵" },
      { id: "B", text: "Red circle on green background 🇧🇩" },
      { id: "C", text: "Yellow stars on red 🇨🇳" },
      { id: "D", text: "Blue stripes and stars 🇺🇸" }
    ],
    correctOptionId: "A"
  },
  {
    id: 2,
    question_en: "What is the capital city of Japan?",
    question_jp: "日本の首都はどこですか？",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Osaka" },
      { id: "B", text: "Kyoto" },
      { id: "C", text: "Tokyo" },
      { id: "D", text: "Sapporo" }
    ],
    correctOptionId: "C"
  },
  {
    id: 3,
    question_en: "Which famous mountain is located in Japan?",
    question_jp: "日本にある有名な山はどれですか？",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Mount Fuji 🗻" },
      { id: "B", text: "Mount Everest 🏔️" },
      { id: "C", text: "K2 🏔️" },
      { id: "D", text: "Mount Kilimanjaro 🏔️" }
    ],
    correctOptionId: "A"
  },

  // Bangladesh Related (4)
  {
    id: 4,
    question_en: "Which flag belongs to Bangladesh?",
    question_jp: "バングラデシュの国旗はどれですか？",
    image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Red circle on white 🇯🇵" },
      { id: "B", text: "Red circle on green 🇧🇩" },
      { id: "C", text: "Blue and yellow 🇺🇦" },
      { id: "D", text: "Red and white 🇨🇦" }
    ],
    correctOptionId: "B"
  },
  {
    id: 5,
    question_en: "What is the capital city of Bangladesh?",
    question_jp: "バングラデシュの首都はどこですか？",
    image: "https://images.unsplash.com/photo-1588068222001-1e24747a111a?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Chittagong" },
      { id: "B", text: "Sylhet" },
      { id: "C", text: "Dhaka" },
      { id: "D", text: "Rajshahi" }
    ],
    correctOptionId: "C"
  },
  {
    id: 6,
    question_en: "What is the national animal of Bangladesh?",
    question_jp: "バングラデシュの国獣は何ですか？",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Royal Bengal Tiger 🐅" },
      { id: "B", text: "Panda 🐼" },
      { id: "C", text: "Lion 🦁" },
      { id: "D", text: "Elephant 🐘" }
    ],
    correctOptionId: "A"
  },
  {
    id: 7,
    question_en: "What is the national fruit of Bangladesh?",
    question_jp: "バングラデシュの国果は何ですか？",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Jackfruit 🥭" },
      { id: "B", text: "Mango 🥭" },
      { id: "C", text: "Apple 🍎" },
      { id: "D", text: "Banana 🍌" }
    ],
    correctOptionId: "A"
  },

  // Japan + Bangladesh Bridge Questions (3)
  {
    id: 8,
    question_en: "Which shape is common in both Bangladesh and Japan flags?",
    question_jp: "バングラデシュと日本の国旗に共通する形は何ですか？",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Circle (🔴)" },
      { id: "B", text: "Star (⭐)" },
      { id: "C", text: "Triangle (🔺)" },
      { id: "D", text: "Square (🟥)" }
    ],
    correctOptionId: "A"
  },
  {
    id: 9,
    question_en: "What is the main staple food of both Bangladesh and Japan?",
    question_jp: "バングラデシュと日本の両方の主食は何ですか？",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "Rice 🍚" },
      { id: "B", text: "Bread 🍞" },
      { id: "C", text: "Pizza 🍕" },
      { id: "D", text: "Pasta 🍝" }
    ],
    correctOptionId: "A"
  },
  {
    id: 10,
    question_en: "Which program connects young engineers of Bangladesh and Japan?",
    question_jp: "バングラデシュと日本の若手エンジニアをつなぐプログラムは何ですか？",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
    options: [
      { id: "A", text: "B-JET Program 🇧🇩🇯🇵" },
      { id: "B", text: "NASA Space Club 🚀" },
      { id: "C", text: "Olympic Games 🏅" },
      { id: "D", text: "FIFA World Cup ⚽" }
    ],
    correctOptionId: "A"
  }
];