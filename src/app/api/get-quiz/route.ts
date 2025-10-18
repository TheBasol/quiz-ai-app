import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Cliente configurado para OpenRouter
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.YOUR_SITE_URL,
    'X-Title': 'Quiz AI App',
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      topic, 
      category, 
      difficulty = 'Medium', 
      numberOfQuestions = 5, 
      language = 'English',
      focusArea,
      additionalInstructions 
    } = body;

    // Validación básica
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (numberOfQuestions < 5 || numberOfQuestions > 7) {
      return NextResponse.json(
        { error: 'Number of questions must be between 5 and 7' },
        { status: 400 }
      );
    }

    // Construir el prompt
    const systemPrompt = `You are an expert quiz creator. Create educational quizzes that are accurate, engaging, and appropriate for the specified difficulty level.

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

    const userPrompt = `Create a ${difficulty.toLowerCase()} level quiz about "${topic}" in ${language}.
    
Details:
- Category: ${category || 'General'}
- Number of questions: ${numberOfQuestions}
- Difficulty: ${difficulty}
- Language: ${language}
${focusArea ? `- Focus area: ${focusArea}` : ''}
${additionalInstructions ? `- Additional instructions: ${additionalInstructions}` : ''}

Please ensure the quiz is educational, accurate, and appropriate for the ${difficulty.toLowerCase()} difficulty level.`;

    // Modelos de fallback en orden de preferencia
    const models = [
      "google/gemma-2-9b-it:free",
      "microsoft/phi-3-mini-128k-instruct:free",
      "deepseek/deepseek-r1:free",
    ];

    const maxRetriesPerModel = 3; // Máximo 3 intentos por modelo
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

        // Validar que las opciones no estén vacías
        if (question.options.some((opt: string) => !opt || opt.trim() === '')) {
          return { isValid: false, error: `Question ${i + 1} has empty options` };
        }
      }

      return { isValid: true };
    };

    // Función para procesar una respuesta de AI
    const processAIResponse = (rawResponse: string): { success: boolean; data?: any; error?: string } => {
      try {
        // Limpiar la respuesta removiendo markdown y texto extra
        let cleanResponse = rawResponse.trim();
        
        // Remover bloques de código markdown si existen
        cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        
        // Buscar el JSON en la respuesta
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : cleanResponse;
        
        const quizData = JSON.parse(jsonString);
        
        // Validar la estructura
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
      
      // Intentar múltiples veces con el mismo modelo
      for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
        try {
          console.log(`   Attempt ${attempt}/${maxRetriesPerModel}`);
          
          const completion = await openai.chat.completions.create({
            model: model,
            messages: [
              {
                role: "system",
                content: systemPrompt
              },
              {
                role: "user",
                content: userPrompt
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

          // Procesar y validar la respuesta
          const result = processAIResponse(rawResponse);
          
          if (result.success && result.data) {
            console.log(`✅ SUCCESS: Valid quiz generated with ${model} on attempt ${attempt}`);
            
            // Agregar IDs a las preguntas
            const questionsWithIds = result.data.questions.map((question: any, index: number) => ({
              ...question,
              id: index + 1
            }));

            // Preparar la respuesta final
            const finalQuiz = {
              name: result.data.name || `${topic} Quiz`,
              description: result.data.description || `A ${difficulty.toLowerCase()} level quiz about ${topic}`,
              category: result.data.category || category || 'General',
              difficulty: result.data.difficulty || difficulty,
              timeLimit: {
                hours: 0,
                minutes: Math.max(15, numberOfQuestions * 2)
              },
              questions: questionsWithIds
            };

            // ✅ RETORNAR RESPUESTA VÁLIDA INMEDIATAMENTE
            return NextResponse.json({
              success: true,
              quiz: finalQuiz,
              metadata: {
                tokensUsed: completion.usage?.total_tokens || 0,
                model: model,
                attempt: attempt,
                generatedAt: new Date().toISOString()
              }
            });
          } else {
            // Respuesta inválida, registrar error y continuar
            const errorMsg = `${model} (attempt ${attempt}): ${result.error}`;
            console.log(`   ❌ Invalid response: ${result.error}`);
            allErrors.push(errorMsg);
          }

        } catch (error: any) {
          const errorMsg = `${model} (attempt ${attempt}): ${error.message}`;
          console.log(`   ❌ API Error: ${error.message}`);
          allErrors.push(errorMsg);
          
          // Si es rate limit, esperar antes del siguiente intento
          if (error.status === 429) {
            console.log(`   ⏳ Rate limited, waiting ${attempt * 2} seconds...`);
            await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          }
          
          // Si es un error fatal, no intentar más con este modelo
          if (error.status === 401 || error.status === 403) {
            console.log(`   🚫 Fatal error with ${model}, skipping remaining attempts`);
            break;
          }
        }
      }
      
      console.log(`❌ All attempts failed for model: ${model}`);
    }

    // ❌ Si llegamos aquí, todos los modelos y intentos fallaron
    console.error('🚫 ALL MODELS AND ATTEMPTS FAILED');
    console.error('All errors:', allErrors);

    return NextResponse.json({
      success: false,
      error: 'Unable to generate a valid quiz after trying all available AI models',
      details: {
        modelsAttempted: models,
        totalAttempts: models.length * maxRetriesPerModel,
        errors: allErrors.slice(-5) // Solo mostrar los últimos 5 errores para no sobrecargar
      }
    }, { status: 503 }); // Service Unavailable

  } catch (error) {
    console.error('💥 FATAL API Error:', error);
    
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key configuration' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Unexpected server error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Quiz AI API is running with robust fallback system',
    endpoints: {
      POST: '/api/get-quiz',
      description: 'Generate a quiz with AI (multiple models with validation)',
      requiredFields: ['topic'],
      optionalFields: ['category', 'difficulty', 'numberOfQuestions', 'language', 'focusArea', 'additionalInstructions']
    },
    availableModels: [
      'google/gemma-2-9b-it:free', 
      'microsoft/phi-3-mini-128k-instruct:free',
      'deepseek/deepseek-r1:free'
    ],
    features: [
      'Multi-model fallback',
      'Response validation', 
      'Multiple attempts per model',
      'Detailed error reporting'
    ]
  });
}