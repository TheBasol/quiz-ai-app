import { create } from 'zustand';
import { Quiz } from '@/interfaces';
import { quiz as initialQuizzes } from '@/data/questions';

interface QuizState {
  quizzes: Quiz[];
}

interface QuizActions {
  getQuizzes: () => Quiz[];
  getQuizById: (id: number) => Quiz | undefined;
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
}

type QuizStore = QuizState & QuizActions;

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: initialQuizzes,

  getQuizzes: () => {
    return get().quizzes;
  },
  getQuizById: (id: number) => {
    return get().quizzes.find(quiz => quiz.id === id);
  },


  addQuiz: (newQuiz: Omit<Quiz, 'id'>) => {
    set((state) => {
      const maxId = state.quizzes.length > 0 
        ? Math.max(...state.quizzes.map(q => q.id)) 
        : 0;
      
      const quizWithId: Quiz = {
        ...newQuiz,
        id: maxId + 1
      };

      return {
        quizzes: [...state.quizzes, quizWithId],
        error: null
      };
    });
  },

}));


export const useQuizActions = () => {
  const {
    addQuiz,
  } = useQuizStore();

  return {
    addQuiz
  };
};

export const useQuizData = () => {
  const {
    quizzes,
    getQuizzes,
    getQuizById
  } = useQuizStore();

  return {
    quizzes,
    getQuizzes,
    getQuizById
  };
};