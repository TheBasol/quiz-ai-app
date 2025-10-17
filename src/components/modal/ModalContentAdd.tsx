import { Question, Quiz, TimeLimit } from "@/interfaces";


interface ModalContentAddProps {
  quizData: {
    name: string;
    description: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeLimit: TimeLimit;
  }; 
  questions: Omit<Question, 'id'>[]; // ✅ Sin 'id' porque aún no se ha guardado
  currentStep: number;
  handleQuizDataChange: (field: string, value: any) => void;
  handleTimeLimitChange: (unit: 'hours' | 'minutes', value: number) => void;
  handleQuestionChange: (questionIndex: number, field: string, value: any) => void;
  handleOptionChange: (questionIndex: number, optionIndex: number, value: string) => void;
  addQuestion: () => void;
  removeQuestion: (questionIndex: number) => void;
}

export const ModalContentAdd = ({
  quizData,
  questions,
  currentStep,
  handleQuizDataChange,
  handleTimeLimitChange,
  handleQuestionChange,
  handleOptionChange,
  addQuestion,
  removeQuestion
}: ModalContentAddProps) => {
  return (
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Step 1: Quiz Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Quiz Name */}
                <div>
                  <label className="block text-white font-medium mb-2">Quiz Name *</label>
                  <input
                    type="text"
                    value={quizData.name}
                    onChange={(e) => handleQuizDataChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter quiz name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-white font-medium mb-2">Category *</label>
                  <input
                    type="text"
                    value={quizData.category}
                    onChange={(e) => handleQuizDataChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="e.g., Programming, Science, History"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2">Description *</label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => handleQuizDataChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  placeholder="Brief description of the quiz"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Difficulty */}
                <div>
                  <label className="block text-white font-medium mb-2">Difficulty</label>
                  <select
                    value={quizData.difficulty}
                    onChange={(e) => handleQuizDataChange('difficulty', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Time Limit Hours */}
                <div>
                  <label className="block text-white font-medium mb-2">Hours</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={quizData.timeLimit.hours}
                    onChange={(e) => handleTimeLimitChange('hours', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* Time Limit Minutes */}
                <div>
                  <label className="block text-white font-medium mb-2">Minutes</label>
                  <input
                    type="number"
                    min="1"
                    max="59"
                    value={quizData.timeLimit.minutes}
                    onChange={(e) => handleTimeLimitChange('minutes', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Questions */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
                  
                  {/* Question Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">Question {questionIndex + 1}</h3>
                    {questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <label className="block text-white font-medium mb-2">Question *</label>
                    <textarea
                      value={question.question}
                      onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                      placeholder="Enter your question"
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label className="block text-white font-medium mb-2">Option {String.fromCharCode(65 + optionIndex)} *</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <label className="block text-white font-medium mb-2">Correct Answer *</label>
                    <select
                      value={question.answer}
                      onChange={(e) => handleQuestionChange(questionIndex, 'answer', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="">Select correct answer</option>
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option} disabled={!option.trim()}>
                          {option.trim() ? `${String.fromCharCode(65 + optionIndex)}: ${option}` : `Option ${String.fromCharCode(65 + optionIndex)} (empty)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {/* Add Question Button */}
              <button
                onClick={addQuestion}
                className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Question
              </button>
            </div>
          )}
    </div>
  );
};