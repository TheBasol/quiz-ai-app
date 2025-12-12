'use client';
import React from 'react';
import { Quiz } from '@/interfaces';
import { useEditQuizEngine } from '@/hooks/useEditQuizEngine';
import { ModalContentAdd } from './ModalContentAdd';

interface ModalEditQuizProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
}

export const ModalEditQuiz = ({ isOpen, onClose, quiz }: ModalEditQuizProps) => {
  const {
    quizData,
    questions,
    currentStep,
    isSaving,
    saveError,
    handleQuizDataChange,
    handleTimeLimitChange,
    handleQuestionChange,
    handleOptionChange,
    addQuestion,
    removeQuestion,
    setCurrentStep,
    handleClose,
    handleSave
  } = useEditQuizEngine({ quiz, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Edit Quiz</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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

        {/* Error Message */}
        {saveError && (
          <div className="px-6 py-3 bg-red-600/20 border-t border-red-500 text-red-300 text-sm">
            {saveError}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-700 bg-gray-900/50">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            
            {currentStep < 2 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 ${isSaving ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-75 flex items-center gap-2`}
              >
                {isSaving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
