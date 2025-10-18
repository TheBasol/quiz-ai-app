import openAIClient from '@/config/config';
import { getSystemPrompt, getUserPrompt, models } from '@/data/prompts';
import { quizGeneratorService } from '@/services/quizGeneratorService';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


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
      additionalInstructions,
      timeLimit = { hours: 0, minutes: 30 }
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

    const quizService = quizGeneratorService();
    const response = await quizService.generateQuiz({
      topic,
      category,
      difficulty,
      numberOfQuestions,
      language,
      focusArea,
      additionalInstructions,
      timeLimit
    });

    if (!response.success) {
      return NextResponse.json(
        { error: response.error || 'Failed to generate quiz' },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      quiz: response.quiz,
      metadata: response.metadata
    });

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
      optionalFields: ['category', 'difficulty', 'numberOfQuestions', 'language', 'focusArea', 'additionalInstructions', 'timeLimit']
    },
    features: [
      'Multi-model fallback',
      'Response validation', 
      'Multiple attempts per model',
      'Detailed error reporting'
    ]
  });
}
