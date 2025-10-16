import { Quiz } from "@/interfaces";
import { createSlug, getDifficultyColor } from "@/utils";
import Link from "next/link";

interface QuizCardProps {
  quizItem: Quiz;
}

export const QuizCard = ({ quizItem }: QuizCardProps) => {

    return (
        <>
            {/* Card Header with Color */}
            <div className={`${quizItem.color} h-32 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block bg-black bg-opacity-70 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {quizItem.category}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200">
                    {quizItem.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(quizItem.difficulty)}`}>
                    {quizItem.difficulty}
                    </span>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {quizItem.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quizItem.questions.length} questions
                  </div>
                  

                  <Link href={`/questions/${createSlug(quizItem.name)}-${quizItem.id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/25">
                    Start Quiz
                  </Link>
                </div>
            </div>        
        </>
    );
}