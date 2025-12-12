import { Question, Quiz, TimeLimit } from "@/interfaces";
import { useQuizActions } from "@/store/quiz-store";
import { backendQuizService } from "@/services/backendQuizService";
import { useState } from "react";

interface UseEditQuizEngineProps {
  quiz: Quiz;
  onClose: () => void;
}

export const useEditQuizEngine = ({ quiz, onClose }: UseEditQuizEngineProps) => {
  const { updateQuiz } = useQuizActions();
  
  const [quizData, setQuizData] = useState({
    name: quiz.name,
    description: quiz.description,
    category: quiz.category,
    difficulty: quiz.difficulty as Quiz['difficulty'],
    timeLimit: quiz.timeLimit as TimeLimit,
  });

  const [questions, setQuestions] = useState<Question[]>(quiz.questions);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleQuizDataChange = (field: string, value: string | Quiz['difficulty']) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeLimitChange = (field: 'hours' | 'minutes', value: number) => {
    setQuizData(prev => ({
      ...prev,
      timeLimit: { ...prev.timeLimit, [field]: value }
    }));
  };

  const handleQuestionChange = (questionIndex: number, field: string, value: string) => {
    setQuestions(prev => {
      const updated = [...prev];
      if (field === 'question' || field === 'answer') {
        updated[questionIndex] = { ...updated[questionIndex], [field]: value };
      }
      return updated;
    });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => {
      const updated = [...prev];
      const newOptions = [...updated[questionIndex].options];
      newOptions[optionIndex] = value;
      updated[questionIndex] = { ...updated[questionIndex], options: newOptions };
      return updated;
    });
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, { id: Date.now(), question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClose = () => {
    // Reset form
    setQuizData({
      name: quiz.name,
      description: quiz.description,
      category: quiz.category,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
    });
    setQuestions(quiz.questions);
    setCurrentStep(1);
    onClose();
  };

  const handleSave = () => {
    // Basic validation
    if (!quizData.name.trim() || !quizData.description.trim() || !quizData.category.trim()) {
      setSaveError('Please fill in all quiz information fields');
      return;
    }

    if (questions.some(q => !q.question.trim() || q.options.some(opt => !opt.trim()) || !q.answer.trim())) {
      setSaveError('Please fill in all question fields');
      return;
    }
    
    setIsSaving(true);
    setSaveError(null);

    const updatedQuiz: Quiz = {
      ...quiz,
      ...quizData,
      questions
    };

    // Guardar en backend
    backendQuizService.updateQuizFull(quiz.id, updatedQuiz).then((response) => {
      if (response.success) {
        // Actualizar en el store local
        updateQuiz(quiz.id, updatedQuiz);
        setIsSaving(false);
        handleClose();
      } else {
        setSaveError(response.error || 'Failed to save quiz');
        setIsSaving(false);
      }
    }).catch((error) => {
      console.error('Error saving quiz:', error);
      setSaveError('Error saving quiz to database');
      setIsSaving(false);
    });
  };    


  return {    
    quizData,
    questions,
    currentStep,
    isSaving,
    saveError,
    handleQuizDataChange,
    handleTimeLimitChange,
    handleQuestionChange,
    handleOptionChange,
    addQuestion,
    removeQuestion,
    setCurrentStep,
    handleClose,
    handleSave
  };
}
