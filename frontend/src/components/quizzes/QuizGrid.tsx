'use client';
import { useEffect, useState } from 'react';
import { QuizCard } from "./QuizCard";
import { useQuizData } from "@/store/quiz-store";
import { useQuizActions } from "@/store/quiz-store";
import { backendQuizService } from '@/services/backendQuizService';
import { Quiz } from '@/interfaces';


export const QuizGrid = () => {

    const { quizzes } = useQuizData();
    const { loadQuizzesFromBackend } = useQuizActions();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapBackendQuizToQuiz = (backendQuiz: any): Quiz => {
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

    useEffect(() => {
        const fetchQuizzes = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await backendQuizService.getAllQuizzes();
                
                if (response.success && response.quizzes) {
                    // Mapear los quizzes del backend a nuestro formato
                    const mappedQuizzes = response.quizzes.map(mapBackendQuizToQuiz);
                    loadQuizzesFromBackend(mappedQuizzes);
                } else {
                    setError(response.error || 'Error al cargar los quizzes');
                }
            } catch (err) {
                setError('Error al conectar con el servidor');
                console.error('Error fetching quizzes:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizzes();
    }, [loadQuizzesFromBackend]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="mt-4 text-gray-300">Cargando quizzes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-900 bg-opacity-50 border border-red-700 p-4 text-red-200">
                <p>{error}</p>
            </div>
        );
    }

    if (quizzes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No hay quizzes disponibles</p>
                <p className="text-gray-500 text-sm mt-2">Crea uno nuevo para comenzar</p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quizItem, index) => (
            <div 
              key={`quiz-${quizItem.id}-${index}`}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-700 hover:border-purple-500/50"
            >
                <QuizCard quizItem={quizItem} />
            </div>
          ))}
        </div>
    );
}