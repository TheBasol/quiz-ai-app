'use client';

import { useAddQuizEngine } from '@/hooks/useAddQuizEngine';
import { ModalContentAdd } from './ModalContentAdd';

interface ModalAddQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddQuiz = ({ isOpen, onClose }: ModalAddQuizProps) => {
  
    const {
        quizData,
        questions,
        currentStep,
        setCurrentStep,
        handleQuizDataChange,
        handleTimeLimitChange,
        handleQuestionChange,
        handleOptionChange,
        addQuestion,
        removeQuestion,
        handleClose,
        handleSave
    } = useAddQuizEngine({ onClose });

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Quiz</h2>
            <p className="text-white/80 text-sm">Step {currentStep} of 2</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-700 h-1">
          <div 
            className="bg-purple-500 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>

        {/* Content */}
        <ModalContentAdd
          quizData={quizData}
          questions={questions}
          currentStep={currentStep}
          handleQuizDataChange={handleQuizDataChange}
          handleTimeLimitChange={handleTimeLimitChange}
          handleQuestionChange={handleQuestionChange}
          handleOptionChange={handleOptionChange}
          addQuestion={addQuestion}
          removeQuestion={removeQuestion}
        />

        {/* Footer */}
        <div className="bg-gray-700/50 px-6 py-4 flex justify-between items-center">
          <div className="flex gap-3">
            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            {currentStep === 1 ? (
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Next: Add Questions
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Save Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};