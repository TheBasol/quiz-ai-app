import { Quiz, TimeLimit } from "@/interfaces";
import { useQuizActions } from "@/store/quiz-store";
import { backendQuizService } from "@/services/backendQuizService";
import { mapBackendQuizToQuiz } from "@/utils/utils";
import { useState } from "react";
import { authService } from "@/services/authService";

interface UseAiAddQuizEngineProps {
  onClose: () => void;
}

export const useAiAddQuizEngine = ({ onClose }: UseAiAddQuizEngineProps) => {
  const { addQuiz } = useQuizActions();

  const [formData, setFormData] = useState({
    topic: '',
    category: '',
    difficulty: 'Medium' as Quiz['difficulty'],
    numberOfQuestions: 5,
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
    'English', 'Spanish'
  ];


  const handleInputChange = (field: string, value: string | number | Quiz['difficulty']) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeLimitChange = (field: 'hours' | 'minutes', value: number) => {
    setFormData(prev => ({
      ...prev,
      timeLimit: { ...prev.timeLimit, [field]: value }
    }));
  };

  const simulateAIGeneration = async () => {
    // Validar que el usuario esté autenticado
    if (!authService.isAuthenticated()) {
      alert('Please log in to create a quiz');
      return;
    }

    setIsGenerating(true);
    
    // Simular el proceso de generación con pasos
    const steps = [
      'Validating your requirements...',
      'Connecting to backend...',
      'Generating questions with AI...',
      'Creating answer options...',
      'Validating quiz structure...',
      'Finalizing your quiz...'
    ];

    // Show simulation steps while waiting for the actual response
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setGenerationStep(steps[stepIndex]);
        stepIndex++;
      } else {
        // Reiniciar el ciclo si la API aún no responde
        stepIndex = 0;
      }
    }, 3000);

    try {
      // Llamar al servicio del backend
      const result = await backendQuizService.createAiQuiz({
        topic: formData.topic,
        category: formData.category,
        difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
        numberOfQuestions: formData.numberOfQuestions,
        language: formData.language,
        additionalInstructions: formData.additionalInstructions
      });

      // Detener la simulación de pasos
      clearInterval(stepInterval);

      if (result.success && result.quiz) {
        setGenerationStep('Quiz generated successfully! 🎉');
        
        // Pequeña pausa para mostrar el éxito
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mapear el quiz del backend al formato interno y agregar con timeLimit
        const mappedQuiz = mapBackendQuizToQuiz(result.quiz);
        const quizWithTimeLimit = {
          ...mappedQuiz,
          timeLimit: formData.timeLimit
        };
        addQuiz(quizWithTimeLimit);
        handleClose();
      } else {
        setGenerationStep('');
        alert(result.error || 'Failed to generate quiz');
        setIsGenerating(false);
      }
    } catch (error) {
      // Stop simulation steps in case of error
      clearInterval(stepInterval);
      
      console.error('Error generating quiz:', error);
      setGenerationStep('');
      alert('Failed to generate quiz. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setFormData({
      topic: '',
      category: '',
      difficulty: 'Medium',
      numberOfQuestions: 5,
      timeLimit: { hours: 0, minutes: 30 },
      language: 'English',
      focusArea: '',
      additionalInstructions: ''
    });
    setIsGenerating(false);
    setGenerationStep('');
    onClose();
  };

  return {
    formData,
    categories,
    languages,
    isGenerating,
    generationStep,
    handleInputChange,
    handleTimeLimitChange,
    simulateAIGeneration,
    handleClose
  };
}
