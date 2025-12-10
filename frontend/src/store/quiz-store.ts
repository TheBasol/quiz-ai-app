import { create } from 'zustand';
import { Quiz } from '@/interfaces';

interface User {
  id: string;
  email: string;
  username?: string;
}

interface QuizState {
  quizzes: Quiz[];
  user: User | null;
  isAuthenticated: boolean;
}

interface QuizActions {
  getQuizzes: () => Quiz[];
  getQuizById: (id: number) => Quiz | undefined;
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  loadQuizzesFromBackend: (quizzes: Quiz[]) => void;
}

type QuizStore = QuizState & QuizActions;

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
  user: null,
  isAuthenticated: false,

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
      };
    });
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: user !== null,
    });
  },

  setAuthenticated: (isAuthenticated: boolean) => {
    set({
      isAuthenticated,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      quizzes: [],
    });
  },

  loadQuizzesFromBackend: (quizzes: Quiz[]) => {
    set({
      quizzes,
    });
  },
}));


export const useQuizActions = () => {
  const {
    addQuiz,
    setUser,
    setAuthenticated,
    logout,
    loadQuizzesFromBackend,
  } = useQuizStore();

  return {
    addQuiz,
    setUser,
    setAuthenticated,
    logout,
    loadQuizzesFromBackend,
  };
};

export const useQuizData = () => {
  const {
    quizzes,
    user,
    isAuthenticated,
    getQuizzes,
    getQuizById
  } = useQuizStore();

  return {
    quizzes,
    user,
    isAuthenticated,
    getQuizzes,
    getQuizById
  };
};