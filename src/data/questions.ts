
export const quiz = [
    {
      id: 1,
      name: "Animal Knowledge Quiz",
      description: "Test your knowledge about the animal kingdom",
      timeLimit: { hours: 0, minutes: 10 },
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
      category: "Nature"
    },
]
