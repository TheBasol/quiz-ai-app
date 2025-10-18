'use client';

import { useAiAddQuizEngine } from '@/hooks/useAiAddQuizEngine';
import { ModalContentAiAdd } from './ModalContentAiAdd';

interface ModalAIAddQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAIAddQuiz = ({ isOpen, onClose }: ModalAIAddQuizProps) => {

  const {
    formData,
    handleInputChange,
    handleTimeLimitChange,
    isGenerating,
    generationStep,
    simulateAIGeneration,
    handleClose,
    categories,
    languages,
    focusAreas  
  } = useAiAddQuizEngine({ onClose, isOpen });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">AI Quiz Generator</h2>
              <p className="text-white/80 text-sm">Let AI create a custom quiz for you</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isGenerating}
            className="text-white/80 hover:text-white transition-colors p-2 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <ModalContentAiAdd 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleTimeLimitChange={handleTimeLimitChange} 
        isGenerating={isGenerating} 
        generationStep={generationStep} 
        categories={categories} 
        languages={languages} 
        focusAreas={focusAreas} />

        {/* Footer */}
        {!isGenerating && (
          <div className="bg-gray-700/50 px-6 py-4 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              🤖 Powered by AI • Generated quizzes are customized to your specifications
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={simulateAIGeneration}
                disabled={!formData.topic.trim()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};