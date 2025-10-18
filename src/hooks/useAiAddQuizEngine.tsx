import { Quiz, TimeLimit } from "@/interfaces";
import { useQuizActions } from "@/store/quiz-store";
import { useState } from "react";

interface UseAiAddQuizEngineProps {
  onClose: () => void;
  isOpen: boolean;
}

export const useAiAddQuizEngine = ({ onClose, isOpen }: UseAiAddQuizEngineProps) => {
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

  const focusAreas = [
    'General Knowledge', 'Beginner Fundamentals', 'Advanced Concepts',
    'Practical Applications', 'Theory & Principles', 'Current Trends',
    'Historical Context', 'Problem Solving', 'Case Studies', 'Best Practices'
  ];


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
      'Connecting to AI models...',
      'Generating questions...',
      'Creating answer options...',
      'Validating quiz structure...',
      'Finalizing your quiz...'
    ];

    // Mostrar pasos de simulación mientras esperamos la respuesta real
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
      // ✅ Llamar a la API real (no simulada)
      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: formData.topic,
          category: formData.category,
          difficulty: formData.difficulty,
          numberOfQuestions: formData.numberOfQuestions,
          language: formData.language,
          focusArea: formData.focusArea,
          additionalInstructions: formData.additionalInstructions
        })
      });

      // Detener la simulación de pasos
      clearInterval(stepInterval);

      const data = await response.json();

      if (data.success) {
        setGenerationStep('Quiz generated successfully! 🎉');
        
        // Pequeña pausa para mostrar el éxito
        await new Promise(resolve => setTimeout(resolve, 1000));

        data.quiz.timeLimit = formData.timeLimit;
        addQuiz(data.quiz);
        handleClose();
      } else {
        setGenerationStep('');
        alert(data.error || 'Failed to generate quiz');
        setIsGenerating(false);
      }
    } catch (error) {
      // Detener la simulación de pasos en caso de error
      clearInterval(stepInterval);
      
      console.error('Error:', error);
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
    focusAreas,
    isGenerating,
    generationStep,
    handleInputChange,
    handleTimeLimitChange,
    simulateAIGeneration,
    handleClose
  };
}
