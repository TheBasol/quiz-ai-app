'use client';
import { QuizCard } from "./QuizCard";
import { useQuizData } from "@/store/quiz-store";


export const QuizGrid = () => {

    const { quizzes } = useQuizData();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quizItem) => (
            <div 
              key={quizItem.id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-700 hover:border-purple-500/50"
            >
                <QuizCard quizItem={quizItem} />
            </div>
          ))}
        </div>
    );
}