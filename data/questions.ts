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
      { id: "C", text: "Olympus Mons", image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:224,cw:576,ch:576,q:80,w:576/FgDxtn3qXx4vf8AHj2NYGm.jpg" },
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
      { id: "A", text: "Chittagong", image: "https://www.deraresort.com/images/tourist-place-in-cox-bazar.jpg" },
      { id: "B", text: "Sylhet", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/70/25/28/pangthumai-waterfall.jpg?w=500&h=400&s=1" },
      { id: "C", text: "Dhaka", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWuarSf_D8GfOYN73WSlh0AoCZ7y9XnQINJ7dV5jUtQRCqBpBxvJGc0SC&s=10" },
      { id: "D", text: "Rajshahi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRYWHvAdDtDWTLghRzAi4e5UVL28vpjBSGgYXZLjK3Kj8otQh5T9C438&s=10" }
    ],
    correctOptionId: "C"
  },
  {
    id: 6,
    question_en: "BJET is mainly for...",
    question_jp: "BJETは主に誰のためのプログラムですか？",
    options: [
      { id: "A", text: "Pilot ✈️", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQebbaltAsJAPGLCuJ5LHAIcF4haAm3ucBIkCzns7RM6hUV6-d1JEmPQ&s=10" },
      { id: "B", text: "Doctor 🩺", image: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*" },
      { id: "C", text: "IT Engineer 💻", image: "https://www.gisma.com/uploads/sites/5/2024/12/pexels-thisisengineering-3861958-scaled.jpg?w=1024" },
      { id: "D", text: "Farmer 🌾", image: "https://images.stockcake.com/public/f/b/b/fbb1eb1e-5fdb-4bd8-b109-33e48c06add3_large/farmer-working-field-stockcake.jpg" }
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