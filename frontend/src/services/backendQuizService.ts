import { BACKEND_URL } from '@/config';
import { Quiz } from '@/interfaces';
import { authService } from './authService';

const API_URL = BACKEND_URL;

export interface QuizCreateRequest {
  topic: string;
  category?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  numberOfQuestions: number;
  language?: string;
  focusArea?: string;
  additionalInstructions?: string;
}

export interface QuizResponse {
  success: boolean;
  quiz?: Quiz;
  quizzes?: Quiz[];
  error?: string;
}

class BackendQuizService {
  async createAiQuiz(request: QuizCreateRequest): Promise<QuizResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create quiz',
        };
      }

      return {
        success: true,
        quiz: data,
      };
    } catch (error) {
      console.error('Quiz creation error:', error);
      return {
        success: false,
        error: 'Failed to connect to backend',
      };
    }
  }

  async getAllQuizzes(): Promise<QuizResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz`, {
        method: 'GET',
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      console.log('Fetched quizzes:', data);

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch quizzes',
        };
      }

      return {
        success: true,
        quizzes: Array.isArray(data) ? data : [],
      };
    } catch (error) {
      console.error('Quiz fetch error:', error);
      return {
        success: false,
        error: 'Failed to connect to backend',
      };
    }
  }

  async getQuizById(id: number): Promise<QuizResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz/${id}`, {
        method: 'GET',
        headers: authService.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Quiz not found',
        };
      }

      return {
        success: true,
        quiz: data,
      };
    } catch (error) {
      console.error('Quiz fetch error:', error);
      return {
        success: false,
        error: 'Failed to connect to backend',
      };
    }
  }

  async updateQuizFull(id: number, quiz: Quiz): Promise<QuizResponse> {
    try {
      // Convertir timeLimit a formato HH:mm:ss para el backend
      const hours = String(quiz.timeLimit.hours).padStart(2, '0');
      const minutes = String(quiz.timeLimit.minutes).padStart(2, '0');
      const timeLimitString = `${hours}:${minutes}:00`;

      const requestDto = {
        Name: quiz.name,
        Description: quiz.description,
        Category: quiz.category,
        Difficulty: quiz.difficulty,
        TimeLimit: timeLimitString,
        Questions: quiz.questions.map(q => ({
          QuestionText: q.question,
          Options: q.options.map(opt => ({
            Text: opt,
            IsCorrect: opt === q.answer
          }))
        }))
      };

      const response = await fetch(`${BACKEND_URL}/api/quiz/${id}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(requestDto),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to update quiz',
        };
      }

      return {
        success: true,
        quiz: data,
      };
    } catch (error) {
      console.error('Quiz update error:', error);
      return {
        success: false,
        error: 'Failed to connect to backend',
      };
    }
  }


  async deleteQuiz(id: number): Promise<QuizResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        const data = await response.json();
        return {
          success: false,
          error: data.error || 'Failed to delete quiz',
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error('Quiz deletion error:', error);
      return {
        success: false,
        error: 'Failed to connect to backend',
      };
    }
  }
}

export const backendQuizService = new BackendQuizService();
