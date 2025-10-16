import { quiz } from "@/data/questions";
import { QuizCard } from "./QuizCard";


export const QuizGrid = () => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quiz.map((quizItem) => (
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