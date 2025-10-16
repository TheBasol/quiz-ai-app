export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface TimeLimit {
  hours: number;
  minutes: number;
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
  timeLimit: TimeLimit;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
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