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


export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent?: number; // en segundos
}


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

export interface FormData {
    topic: string;
    category: string;
    difficulty: Quiz['difficulty'];
    numberOfQuestions: number;
    timeLimit: TimeLimit;
    language: string;
    focusArea: string;
    additionalInstructions: string;
};