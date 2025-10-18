import openAIClient from '@/config/config';
import { getSystemPrompt, getUserPrompt, models } from '@/data/prompts';

interface QuizGeneratorOptions {
  topic: string;
  category?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  numberOfQuestions: number;
  language?: string;
  focusArea?: string;
  additionalInstructions?: string;
  timeLimit?: { hours: number; minutes: number };
}

interface QuizGeneratorResponse {
  success: boolean;
  quiz?: any;
  metadata?: any;
  error?: string;
  details?: any;
}

export const quizGeneratorService = () => {
  const generateQuiz = async (options: QuizGeneratorOptions): Promise<QuizGeneratorResponse> => {
    const {
      topic,
      category,
      difficulty,
      numberOfQuestions,
      language = 'English',
      focusArea,
      additionalInstructions,
      timeLimit = { hours: 0, minutes: 30 }
    } = options;

    const maxRetriesPerModel = 3;
    const allErrors: string[] = [];
    
    // Función para validar la respuesta del quiz
    const validateQuizResponse = (quizData: any): { isValid: boolean; error?: string } => {
      if (!quizData.questions || !Array.isArray(quizData.questions)) {
        return { isValid: false, error: 'Invalid quiz structure - no questions array' };
      }

      if (quizData.questions.length !== numberOfQuestions) {
        return { isValid: false, error: `Expected ${numberOfQuestions} questions, got ${quizData.questions.length}` };
      }

      for (let i = 0; i < quizData.questions.length; i++) {
        const question = quizData.questions[i];
        
        if (!question.question || !question.options || !question.answer) {
          return { isValid: false, error: `Question ${i + 1} is missing required fields` };
        }

        if (!Array.isArray(question.options) || question.options.length !== 4) {
          return { isValid: false, error: `Question ${i + 1} must have exactly 4 options` };
        }

        if (!question.options.includes(question.answer)) {
          return { isValid: false, error: `Question ${i + 1} answer doesn't match any option` };
        }

        if (question.options.some((opt: string) => !opt || opt.trim() === '')) {
          return { isValid: false, error: `Question ${i + 1} has empty options` };
        }
      }

      return { isValid: true };
    };

    // Función para procesar una respuesta de AI
    const processAIResponse = (rawResponse: string): { success: boolean; data?: any; error?: string } => {
      try {
        let cleanResponse = rawResponse.trim();
        cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : cleanResponse;
        
        const quizData = JSON.parse(jsonString);
        
        const validation = validateQuizResponse(quizData);
        if (!validation.isValid) {
          return { success: false, error: validation.error };
        }

        return { success: true, data: quizData };
      } catch (parseError) {
        return { success: false, error: 'Failed to parse JSON response' };
      }
    };

    // Intentar con cada modelo hasta obtener una respuesta válida
    for (const model of models) {
      console.log(`🔄 Trying model: ${model}`);
      
      for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
        try {
          console.log(`   Attempt ${attempt}/${maxRetriesPerModel}`);
          
          const completion = await openAIClient.chat.completions.create({
            model: model,
            messages: [
              {
                role: "system",
                content: getSystemPrompt(numberOfQuestions)
              },
              {
                role: "user",
                content: getUserPrompt(topic, category || '', difficulty, numberOfQuestions, language, focusArea || '', additionalInstructions || '')
              }
            ],
            temperature: 0.7,
            max_tokens: 2500,
          });

          const rawResponse = completion.choices[0]?.message?.content;
          
          if (!rawResponse) {
            allErrors.push(`${model} (attempt ${attempt}): No response content`);
            continue;
          }

          console.log(`   Processing response from ${model}`);

          const result = processAIResponse(rawResponse);
          
          if (result.success && result.data) {
            console.log(`✅ SUCCESS: Valid quiz generated with ${model} on attempt ${attempt}`);
            
            const questionsWithIds = result.data.questions.map((question: any, index: number) => ({
              ...question,
              id: index + 1
            }));

            const finalQuiz = {
              name: result.data.name || `${topic} Quiz`,
              description: result.data.description || `A ${difficulty.toLowerCase()} level quiz about ${topic}`,
              category: result.data.category || category || 'General',
              difficulty: result.data.difficulty || difficulty,
              timeLimit: timeLimit,
              questions: questionsWithIds
            };

            return {
              success: true,
              quiz: finalQuiz,
              metadata: {
                tokensUsed: completion.usage?.total_tokens || 0,
                model: model,
                attempt: attempt,
                generatedAt: new Date().toISOString()
              }
            };
          } else {
            const errorMsg = `${model} (attempt ${attempt}): ${result.error}`;
            console.log(`   ❌ Invalid response: ${result.error}`);
            allErrors.push(errorMsg);
          }

        } catch (error: any) {
          const errorMsg = `${model} (attempt ${attempt}): ${error.message}`;
          console.log(`   ❌ API Error: ${error.message}`);
          allErrors.push(errorMsg);
          
          if (error.status === 429) {
            console.log(`   ⏳ Rate limited, waiting ${attempt * 2} seconds...`);
            await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          }
          
          if (error.status === 401 || error.status === 403) {
            console.log(`   🚫 Fatal error with ${model}, skipping remaining attempts`);
            break;
          }
        }
      }
      
      console.log(`❌ All attempts failed for model: ${model}`);
    }

    console.error('🚫 ALL MODELS AND ATTEMPTS FAILED');
    console.error('All errors:', allErrors);

    return {
      success: false,
      error: 'Unable to generate a valid quiz after trying all available AI models',
      details: {
        modelsAttempted: models,
        totalAttempts: models.length * maxRetriesPerModel,
        errors: allErrors.slice(-5)
      }
    };
  };

  return {
    generateQuiz
  };
};