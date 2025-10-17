'use client';
import { Quiz } from '@/interfaces';
import { AnswerQuestion } from './AnswerQuestion';
import { useQuizEngine } from '@/hooks/useQuizEngine';

interface QuestionCardProps {
  quiz : Quiz
}

export const QuestionCard = ({ quiz }: QuestionCardProps) => {
  
  const {
    questionNumber,
    totalQuestions,
    currentQuestion,
    selectedAnswer,
    currentQuestionIndex,
    showResult,
    timeQuiz,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useQuizEngine(quiz);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-3xl min-h-[650px] sm:min-h-0 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-6 sm:py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">{questionNumber}</span>
              </div>
              <div>
                <p className="text-white/80 text-xs sm:text-sm font-medium">Question {questionNumber}</p>
                <p className="text-white/60 text-xs">of {totalQuestions}</p>
              </div>
            </div>
            
            {/* Timer and Progress indicator */}
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="bg-white/20 rounded-lg px-3 py-1 flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-bold text-sm sm:text-base">{timeQuiz}</span>
              </div>
              
              {/* Progress indicator */}
              <div className="text-white/80 text-xs sm:text-sm font-medium">
                {Math.round((questionNumber / totalQuestions) * 100)}%
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6 sm:p-6 flex flex-col justify-between min-h-[520px] sm:min-h-0">
          <div>
            <h2 className="text-xl sm:text-xl lg:text-2xl font-bold text-white mb-8 sm:mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answers */}
            <div className="space-y-4 sm:space-y-3">
              {currentQuestion.options.map((option, index) => (
                <AnswerQuestion key={index} option={option} showResult={showResult} currentSelectedAnswer={selectedAnswer} currentQuestion={currentQuestion} handleAnswerSelect={handleAnswerSelect} index={index} />
              ))}
            </div>
          </div>

          {/* Action buttons */}

            <div className="mt-8 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button 
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium text-base sm:text-base"
              disabled={currentQuestionIndex === 0}
              onClick={handlePreviousQuestion}
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>  
                Previous
              </button>
              
              <button 
                className={`w-full sm:w-auto px-6 sm:px-6 py-4 sm:py-3 rounded-lg font-medium transition-all duration-200 text-base sm:text-base ${
                  selectedAnswer 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!selectedAnswer}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>

        </div>
      </div>
    </div>
  );
};