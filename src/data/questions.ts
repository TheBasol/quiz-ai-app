
export const quiz = [
    {
      id: 1,
      name: "Animal Knowledge Quiz",
      description: "Test your knowledge about the animal kingdom",
      questions: [
    {
      "id": 1,
      "question": "What is the largest land mammal?",
      "options": ["Elephant", "Rhinoceros", "Hippopotamus", "Giraffe"],
      "answer": "Elephant"
    },
    {
      "id": 2,
      "question": "Which animal is known for its ability to change color for camouflage?",
      "options": ["Snake", "Octopus", "Chameleon", "Gecko"],
      "answer": "Chameleon"
    },
    {
      "id": 3,
      "question": "Which of these animals is a marine mammal?",
      "options": ["Shark", "Penguin", "Dolphin", "Turtle"],
      "answer": "Dolphin"
    },
    {
      "id": 4,
      "question": "What animal builds dams in rivers?",
      "options": ["Otter", "Beaver", "Bear", "Capybara"],
      "answer": "Beaver"
    },
    {
      "id": 5,
      "question": "What is the fastest bird in level flight?",
      "options": ["Golden Eagle", "Peregrine Falcon", "Common Swift", "Hummingbird"],
      "answer": "Common Swift"
    },
    {
      "id": 6,
      "question": "Which animal is the only mammal capable of true flight?",
      "options": ["Flying Squirrel", "Bat", "Sugar Glider", "Lemur"],
      "answer": "Bat"
    },
    {
      "id": 7,
      "question": "What is a group of lions called?",
      "options": ["A pack", "A herd", "A pride", "A flock"],
      "answer": "A pride"
    }
        ],
      difficulty: "Medium" as const,
      category: "Nature",
      color: "bg-green-600"
    },
]

export const availableQuizzes = [
    {
      id: 1,
      name: "Animal Knowledge Quiz",
      description: "Test your knowledge about the animal kingdom",
      questionCount: 10,
      difficulty: "Medium",
      category: "Nature",
      color: "bg-green-600"
    },
    {
      id: 2,
      name: "Science & Technology",
      description: "Explore the world of science and modern technology",
      questionCount: 10,
      difficulty: "Hard",
      category: "Science",
      color: "bg-blue-600"
    },
    {
      id: 3,
      name: "History Quiz",
      description: "Journey through important historical events",
      questionCount: 8,
      difficulty: "Medium",
      category: "History",
      color: "bg-yellow-600"
    },
    {
      id: 4,
      name: "Sports Trivia",
      description: "Test your sports knowledge from around the world",
      questionCount: 12,
      difficulty: "Easy",
      category: "Sports",
      color: "bg-red-600"
    },
    {
      id: 5,
      name: "Geography Challenge",
      description: "Discover countries, capitals, and landmarks",
      questionCount: 15,
      difficulty: "Hard",
      category: "Geography",
      color: "bg-purple-600"
    },
    {
      id: 6,
      name: "Movie & Entertainment",
      description: "From classics to modern hits, test your movie knowledge",
      questionCount: 9,
      difficulty: "Easy",
      category: "Entertainment",
      color: "bg-pink-600"
    }
  ];