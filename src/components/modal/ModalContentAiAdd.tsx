import { FormData } from '@/interfaces';
import { GenerationProgress } from './GenerationProgress';

interface ModalContentAiAddProps {
  formData: FormData;
  handleInputChange: (field: string, value: string | number | 'Easy' | 'Medium' | 'Hard') => void;
  handleTimeLimitChange: (field: 'hours' | 'minutes', value: number) => void;
  isGenerating: boolean;
  generationStep: string;
  categories: string[];
  languages: string[];
  focusAreas: string[];
}

export const ModalContentAiAdd = ({
  formData,
  handleInputChange,
  handleTimeLimitChange,
  isGenerating,
  generationStep,
  categories,
  languages,
  focusAreas
}: ModalContentAiAddProps) => {
  return (
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
                      Be specific about your topic for better results. For example: &quot;React Hooks&quot; instead of just &quot;React&quot;, 
                      or &quot;American Civil War battles&quot; instead of just &quot;History&quot;.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Generation Progress */
            <GenerationProgress generationStep={generationStep} />
          )}
        </div>
  );
}