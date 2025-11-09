export const getSystemPrompt = (numberOfQuestions: number) => {
    return `You are an expert quiz creator. Create educational quizzes that are accurate, engaging, and appropriate for the specified difficulty level.

Return ONLY a valid JSON object with this exact structure (no additional text before or after):
{
  "name": "Quiz title",
  "description": "Brief description of the quiz",
  "category": "Category name",
  "difficulty": "Easy|Medium|Hard",
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct option text (must match exactly one of the options)"
    }
  ]
}

Important guidelines:
- Create exactly ${numberOfQuestions} questions
- Each question must have exactly 4 options
- Make sure the "answer" field contains the exact text from one of the options
- Questions should be clear and unambiguous
- Avoid trick questions unless specifically requested
- Options should be plausible but only one should be correct
- Return ONLY the JSON object, no markdown formatting or additional text`;
}

export const getUserPrompt = (topic: string, category: string, difficulty: string, numberOfQuestions: number, language: string, focusArea?: string, additionalInstructions?: string) => {
    return `Create a ${difficulty.toLowerCase()} level quiz about "${topic}" in ${language}.
    
Details:
- Category: ${category || 'General'}
- Number of questions: ${numberOfQuestions}
- Difficulty: ${difficulty}
- Language: ${language}
${focusArea ? `- Focus area: ${focusArea}` : ''}
${additionalInstructions ? `- Additional instructions: ${additionalInstructions}` : ''}

Please ensure the quiz is educational, accurate, and appropriate for the ${difficulty.toLowerCase()} difficulty level.`;
}

export const models = [
      "google/gemma-2-9b-it:free",
      "google/gemma-2-2b-it:free",
      "google/gemini-flash-1.5:free",
      "microsoft/phi-3-mini-128k-instruct:free",
      "microsoft/phi-3-medium-128k-instruct:free",
      "meta-llama/llama-3.1-8b-instruct:free",
      "meta-llama/llama-3.2-3b-instruct:free",
      "meta-llama/llama-3.2-1b-instruct:free",
      "qwen/qwen-2-7b-instruct:free",
      "qwen/qwen-2.5-7b-instruct:free",
      "deepseek/deepseek-r1:free",
    ];