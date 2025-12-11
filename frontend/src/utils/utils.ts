import { Question, Quiz } from "@/interfaces";

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-400 bg-green-900/30';
        case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
        case 'Hard': return 'text-red-400 bg-red-900/30';
        default: return 'text-gray-400 bg-gray-700/50';
    }   
};

export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getIdFromSlug = (slug: string) => {
    const parts = slug.split('-');
    const actualId = parts[parts.length - 1]; // El último elemento es el ID
    const nameSlug = parts.slice(0, -1).join('-'); // Todo excepto el último elemento
    const name = nameSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { actualId, name };
}


export const getAnswerStyles = (option: string, showResult: boolean, currentSelectedAnswer: string, hoveredAnswer: string,currentQuestion: Question ) => {
    const baseStyles = "w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm sm:text-base";
    
    if (showResult) {
      if (option === currentQuestion.answer) {
        return `${baseStyles} bg-green-600/20 border-green-500 text-green-300`;
      } else if (currentSelectedAnswer === option && option !== currentQuestion.answer) {
        return `${baseStyles} bg-red-600/20 border-red-500 text-red-300`;
      } else {
        return `${baseStyles} bg-gray-800 border-gray-600 text-gray-400`;
      }
    }
    
    if (currentSelectedAnswer === option) {
      return `${baseStyles} bg-purple-600/30 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/25`;
    }
    
    if (hoveredAnswer === option) {
      return `${baseStyles} bg-gray-700 border-gray-500 text-white hover:scale-[1.02] shadow-lg`;
    }
    
    return `${baseStyles} bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white hover:scale-[1.02] hover:shadow-lg`;
  };

export const getResultColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

export const getResultMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    return 'Keep practicing!';
  };

export const getResultGradient = (percentage: number) => {
    if (percentage >= 80) return 'from-green-600 to-emerald-700';
    if (percentage >= 60) return 'from-yellow-600 to-orange-700';
    return 'from-red-600 to-rose-700';
  };

/**
 * Mapea un quiz del backend (formato PascalCase) al formato de la aplicación (camelCase)
 * @param backendQuiz - Quiz raw del backend en formato PascalCase
 * @returns Quiz mapeado al formato interno de la aplicación
 */
export const mapBackendQuizToQuiz = (backendQuiz: any): Quiz => {
  return {
    id: backendQuiz.QuizId,
    name: backendQuiz.Name,
    description: backendQuiz.Description,
    category: backendQuiz.Category,
    difficulty: backendQuiz.Difficulty as 'Easy' | 'Medium' | 'Hard',
    timeLimit: {
      hours: 0,
      minutes: 30,
    },
    questions: (backendQuiz.Questions || []).map((q: any) => ({
      id: q.Id,
      question: q.QuestionText,
      options: (q.Options || []).map((opt: any) => opt.Text),
      answer: (q.Options || []).find((opt: any) => opt.IsCorrect)?.Text || '',
    })),
  };
};