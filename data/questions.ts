export interface Option {
  id: string;
  text?: string;
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
    question_en: "Which flag belongs to Bangladesh?",
    question_jp: "バングラデシュの国旗はどれですか？",
    options: [
      { id: "A", image: "https://flagcdn.com/w320/jp.png" },
      { id: "B", image: "https://flagcdn.com/w320/bd.png" },
      { id: "C", image: "https://flagcdn.com/w320/ua.png" },
      { id: "D", image: "https://flagcdn.com/w320/ca.png" }
    ],
    correctOptionId: "B"
  },
  {
    id: 2,
    question_en: "What is the currency of Bangladesh?",
    question_jp: "バングラデシュの通貨はどれですか？",
    options: [
      { id: "A", text: "Riyal", image: "https://www.shutterstock.com/image-photo/large-fragment-obverse-side-500-260nw-2090870197.jpg" },
      { id: "B", text: "Pound", image: "https://www.forex-central.net/img/British-pound.jpg" },
      { id: "C", text: "Taka", image: "https://www.banknoteworld.com/images/product/Bangladesh%201%2C000%20Taka%20Banknote%2C%202023%2C%20P-59l%2C%20UNC.jpg" },
      { id: "D", text: "Yen", image: "https://www.numismaticnews.net/uploads/MjA5Njc4ODk4NjY3OTg4MTI4/5000-yen.jpg?format=webp&optimize=high&precrop=1%3A1%2Csmart" }
    ],
    correctOptionId: "C"
  },
  {
    id: 3,
    question_en: "What is a famous food in Bangladesh?",
    question_jp: "バングラデシュの有名な食べ物はどれですか？",
    options: [
      { id: "A", text: "French Fry", image: "https://www.recipetineats.com/tachyon/2022/09/Crispy-Fries_8.jpg" },
      { id: "B", text: "Sushi", image: "https://www.craftycookbook.com/wp-content/uploads/2024/04/nigiri-sushi-1200-500x500.jpg" },
      { id: "C", text: "Pizza", image: "https://www.foodandwine.com/thmb/iekWvSyJIRsBtJ6aItWrk6wAm0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/breakfast-pizza-xl-recipe2016_0-b12211fddf06478dba7dd851fe3dc721.jpg" },
      { id: "D", text: "Biriyani", image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/RX_THUMBNAIL/IMAGES/VENDOR/2026/6/9/13dd7a42-e6c2-4dc0-90bf-015753c88507_1383436.jpg" }
    ],
    correctOptionId: "D"
  },
  {
    id: 4,
    question_en: "Which one describes Bangladesh's climate/nature?",
    question_jp: "バングラデシュの気候はどれですか？",
    options: [
      { id: "A", text: "Ice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rP3BrK0KY_ytUXapjEtswjTApLtHJDdgheuyPe-TIA&s=10" },
      { id: "B", text: "Mountain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMRWQYkWriQN3CV8ntK8pDcw2WlrZ4GleUK3VBIBCDpfA7Pi-TJ8N6VOE7&s=10" },
      { id: "C", text: "Desert", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjuUB4rZvfxqJg6Askuzejlp9wOKJfbOEvkUPVmirBlg&s=10" },
      { id: "D", text: "Mild weather", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjvfZVBTb-xuBb8goygXY01qbloKvQ9qKnvhe9hfZjw&s=10" }
    ],
    correctOptionId: "D"
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
      { id: "A", text: "Pilot", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQebbaltAsJAPGLCuJ5LHAIcF4haAm3ucBIkCzns7RM6hUV6-d1JEmPQ&s=10" },
      { id: "B", text: "Doctor", image: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*" },
      { id: "C", text: "IT Engineer", image: "https://www.gisma.com/uploads/sites/5/2024/12/pexels-thisisengineering-3861958-scaled.jpg?w=1024" },
      { id: "D", text: "Farmer", image: "https://images.stockcake.com/public/f/b/b/fbb1eb1e-5fdb-4bd8-b109-33e48c06add3_large/farmer-working-field-stockcake.jpg" }
    ],
    correctOptionId: "C"
  },
  {
    id: 7,
    question_en: "Bangladesh is located in...",
    question_jp: "バングラデシュはどこに位置していますか？",
    options: [
      { id: "A", text: "Europe", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80" },
      { id: "B", text: "North America", image: "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=400&q=80" },
      { id: "C", text: "Africa", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80" },
      { id: "D", text: "Asia", image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?w=400&q=80" }
    ],
    correctOptionId: "D"
  },
  {
    id: 8,
    question_en: "What is the local Bangladeshi dress?",
    question_jp: "バングラデシュの民族衣装は何ですか？",
    options: [
      { id: "A", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76j6-iUJD01HNopuPeWNPp5gthHT9qdcgM-aNauatwLpQoNN4-QrLc5s&s=10" },
      { id: "B", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0OlZ1MIQl3IHb_Vunmz6dtV-hCFM_nHizTrJXd1ViwjmTTAIq5kYy0nA&s=10" },
      { id: "C", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0jtijItijgiOnTy5-xkJKYIqAKAaZKhEjGntcA8cToeO9GpKv87SkMTh&s=10" },
      { id: "D", image: "https://ae01.alicdn.com/kf/Sacf3c9b77d1349e0ac8ba2b2d932ef3ac.jpg" }
    ],
    correctOptionId: "C"
  },
  {
    id: 9,
    question_en: "What is the longest sea beach in the world?",
    question_jp: "世界で最も長い砂浜は何ですか？",
    options: [
      { id: "A", text: "Miami Beach", image: "https://www.worldatlas.com/upload/df/29/12/shutterstock-490898872.jpg" },
      { id: "B", text: "Cox's Bazar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUhLJs_xl5y9Tqh8Jv2c17yHbRNGmn43A5-PABnRv9Q&s=10" },
      { id: "C", text: "Goa Beach", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeeEsr1YK_qI9o5Xp3LNcls6fX_7BKdcnN4CDtVl9LQ&s=10" },
      { id: "D", text: "Bournemouth Beach", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZo-CJphNqZjpPgaLGWXhj_7NYjOcLxX73ABSAUnO_lGRONc064JTH0k&s=10" }
    ],
    correctOptionId: "B"
  },
  {
    id: 10,
    question_en: "What is a famous fruit in Bangladesh?",
    question_jp: "バングラデシュの有名な果物は何ですか？",
    options: [
      { id: "A", text: "Mango", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5omXzprdS4NoRw5HKJx-t0a-f9VSp7t2ZJSBKTAc-OQ&s=10" },
      { id: "B", text: "Jabuticaba", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Plinia_cauliflora.jpg/250px-Plinia_cauliflora.jpg?utm_source=bn.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" },
      { id: "C", text: "Date", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIVW_O76CDkY3e6Z92njyR6RFhXn8BlS1iWbhfDUzRew&s=10" },
      { id: "D", text: "Strawberry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TkNu26jKDazYGad34Jl8FA6FEWBqwzpp1tV4bn1ncaCP9jnko_XdsGn4zwoKLX_j7dN_2OD6FMt6hiqWHhOmbX03gMJ8gR9kkZ7iVw&s=10" }
    ],
    correctOptionId: "A"
  }
];