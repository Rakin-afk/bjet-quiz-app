export interface Option {
  id: string;
  text: string;
  image: string;
}

export interface Question {
  id: number;
  question_en: string;
  question_jp: string;
  options: Option[];
  correctOptionId: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question_en: "Which flag belongs to Japan?",
    question_jp: "日本の国旗はどれですか？",
    options: [
      { id: "A", text: "Japan", image: "https://flagcdn.com/w320/jp.png" },
      { id: "B", text: "Bangladesh", image: "https://flagcdn.com/w320/bd.png" },
      { id: "C", text: "China", image: "https://flagcdn.com/w320/cn.png" },
      { id: "D", text: "USA", image: "https://flagcdn.com/w320/us.png" }
    ],
    correctOptionId: "A"
  },
  {
    id: 2,
    question_en: "What is the capital city of Japan?",
    question_jp: "日本の首都はどこですか？",
    options: [
      { id: "A", text: "Osaka", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80" },
      { id: "B", text: "Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80" },
      { id: "C", text: "Tokyo", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80" },
      { id: "D", text: "Sapporo", image: "https://images.unsplash.com/photo-1578637387939-43c525550085?w=400&q=80" }
    ],
    correctOptionId: "C"
  },
  {
    id: 3,
    question_en: "Which famous mountain is in Japan?",
    question_jp: "日本にある有名な山はどれですか？",
    options: [
      { id: "A", text: "Mount Fuji", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80" },
      { id: "B", text: "Everest", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80" },
      { id: "C", text: "K2", image: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=400&q=80" },
      { id: "D", text: "Kilimanjaro", image: "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=400&q=80" }
    ],
    correctOptionId: "A"
  },
  {
    id: 4,
    question_en: "Which flag belongs to Bangladesh?",
    question_jp: "バングラデシュの国旗はどれですか？",
    options: [
      { id: "A", text: "Japan", image: "https://flagcdn.com/w320/jp.png" },
      { id: "B", text: "Bangladesh", image: "https://flagcdn.com/w320/bd.png" },
      { id: "C", text: "Ukraine", image: "https://flagcdn.com/w320/ua.png" },
      { id: "D", text: "Canada", image: "https://flagcdn.com/w320/ca.png" }
    ],
    correctOptionId: "B"
  },
  {
    id: 5,
    question_en: "What is the capital city of Bangladesh?",
    question_jp: "バングラデシュの首都はどこですか？",
    options: [
      { id: "A", text: "Chittagong", image: "https://images.unsplash.com/photo-1588068222001-1e24747a111a?w=400&q=80" },
      { id: "B", text: "Sylhet", image: "https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=400&q=80" },
      { id: "C", text: "Dhaka", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80" },
      { id: "D", text: "Rajshahi", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80" }
    ],
    correctOptionId: "C"
  },
  {
    id: 6,
    question_en: "BJET is mainly for...",
    question_jp: "BJETは主に誰のためのプログラムですか？",
    options: [
      { id: "A", text: "Pilot ✈️", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80" },
      { id: "B", text: "Doctor 🩺", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" },
      { id: "C", text: "IT Engineer 💻", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80" },
      { id: "D", text: "Farmer 🌾", image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=400&q=80" }
    ],
    correctOptionId: "C"
  },
  {
    id: 7,
    question_en: "Bangladesh is located in...",
    question_jp: "バングラデシュはどこに位置していますか？",
    options: [
      { id: "A", text: "Europe 🌍", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80" },
      { id: "B", text: "North America 🌎", image: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=400&q=80" },
      { id: "C", text: "Africa 🌍", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80" },
      { id: "D", text: "Asia 🌏", image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?w=400&q=80" }
    ],
    correctOptionId: "D"
  }
];