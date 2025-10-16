export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  color: string; // Tailwind color class like 'bg-green-600'
}

// Para respuestas del usuario
export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent?: number; // en segundos
}

// Para resultados del quiz
export interface QuizResult {
  quizId: number;
  userId?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  answers: UserAnswer[];
  completedAt: Date;
}