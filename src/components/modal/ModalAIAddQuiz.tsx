'use client';

import { useState } from 'react';
import { Quiz, Question, TimeLimit } from '@/interfaces';
import { useQuizActions } from '@/store/quiz-store';

interface ModalAIAddQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAIAddQuiz = ({ isOpen, onClose }: ModalAIAddQuizProps) => {
  const { addQuiz } = useQuizActions();
  
  const [formData, setFormData] = useState({
    topic: '',
    category: '',
    difficulty: 'Medium' as Quiz['difficulty'],
    numberOfQuestions: 10,
    timeLimit: { hours: 0, minutes: 30 } as TimeLimit,
    language: 'English',
    focusArea: '',
    additionalInstructions: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Opciones predefinidas
  const categories = [
    'Programming', 'Science', 'History', 'Geography', 'Mathematics',
    'Literature', 'Art', 'Music', 'Sports', 'Technology', 'Business',
    'Health', 'Psychology', 'Philosophy', 'Languages', 'Other'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Russian'
  ];

  const focusAreas = [
    'General Knowledge', 'Beginner Fundamentals', 'Advanced Concepts',
    'Practical Applications', 'Theory & Principles', 'Current Trends',
    'Historical Context', 'Problem Solving', 'Case Studies', 'Best Practices'
  ];

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeLimitChange = (field: 'hours' | 'minutes', value: number) => {
    setFormData(prev => ({
      ...prev,
      timeLimit: { ...prev.timeLimit, [field]: value }
    }));
  };

  const simulateAIGeneration = async () => {
    setIsGenerating(true);
    
    // Simular el proceso de generación con pasos
    const steps = [
      'Analyzing your requirements...',
      'Researching topic content...',
      'Generating questions...',
      'Creating answer options...',
      'Validating quiz structure...',
      'Finalizing your quiz...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }

    // Simular quiz generado
    const mockQuestions: Question[] = Array.from({ length: formData.numberOfQuestions }, (_, index) => ({
      id: index + 1,
      question: `Sample ${formData.topic} question ${index + 1}: What is the main concept related to ${formData.focusArea || formData.topic}?`,
      options: [
        `Correct answer for ${formData.topic}`,
        `Incorrect option A`,
        `Incorrect option B`,
        `Incorrect option C`
      ],
      answer: `Correct answer for ${formData.topic}`
    }));

    const generatedQuiz: Omit<Quiz, 'id'> = {
      name: `AI Generated: ${formData.topic} Quiz`,
      description: `A ${formData.difficulty.toLowerCase()} level quiz about ${formData.topic}. ${formData.additionalInstructions ? 'Special focus: ' + formData.additionalInstructions : ''}`,
      category: formData.category,
      difficulty: formData.difficulty,
      timeLimit: formData.timeLimit,
      questions: mockQuestions
    };

    addQuiz(generatedQuiz);
    setIsGenerating(false);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      topic: '',
      category: '',
      difficulty: 'Medium',
      numberOfQuestions: 10,
      timeLimit: { hours: 0, minutes: 30 },
      language: 'English',
      focusArea: '',
      additionalInstructions: ''
    });
    setIsGenerating(false);
    setGenerationStep('');
    onClose();
  };

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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {!isGenerating ? (
            <div className="space-y-6">
              {/* Topic & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Topic *</label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., JavaScript, World War II, Quantum Physics"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Difficulty & Questions */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Questions</label>
                  <select
                    value={formData.numberOfQuestions}
                    onChange={(e) => handleInputChange('numberOfQuestions', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {[5, 7].map(num => (
                      <option key={num} value={num}>{num} questions</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Limit */}
              <div>
                <label className="block text-white font-medium mb-2">Time Limit</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={formData.timeLimit.hours}
                      onChange={(e) => handleTimeLimitChange('hours', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Hours"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="59"
                      value={formData.timeLimit.minutes}
                      onChange={(e) => handleTimeLimitChange('minutes', parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Minutes"
                    />
                  </div>
                </div>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-white font-medium mb-2">Focus Area (Optional)</label>
                <select
                  value={formData.focusArea}
                  onChange={(e) => handleInputChange('focusArea', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Choose a focus area</option>
                  {focusAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="block text-white font-medium mb-2">Additional Instructions (Optional)</label>
                <textarea
                  value={formData.additionalInstructions}
                  onChange={(e) => handleInputChange('additionalInstructions', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  placeholder="Any specific requirements, style preferences, or areas to emphasize..."
                />
              </div>

              {/* AI Suggestion Box */}
              <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-indigo-300 font-medium mb-1">AI Tip</h4>
                    <p className="text-gray-300 text-sm">
                      Be specific about your topic for better results. For example: "React Hooks" instead of just "React", 
                      or "American Civil War battles" instead of just "History".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Generation Progress */
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
                <svg className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Generating Your Quiz</h3>
              <p className="text-indigo-300 text-lg mb-4">{generationStep}</p>
              <div className="w-64 mx-auto bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm mt-4">This may take a few moments...</p>
            </div>
          )}
        </div>

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