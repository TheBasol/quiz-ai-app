import { Question, Quiz, TimeLimit } from "@/interfaces";
import { useQuizActions } from "@/store/quiz-store";
import { useState } from "react";

interface UseAddQuizEngineProps {
  onClose: () => void;
}

export const useAddQuizEngine = ({ onClose }: UseAddQuizEngineProps) => {
  const { addQuiz } = useQuizActions();
  
  const [quizData, setQuizData] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: 'Easy' as Quiz['difficulty'],
    timeLimit: { hours: 0, minutes: 30 } as TimeLimit,
  });

  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([
    { question: '', options: ['', '', '', ''], answer: '' }
  ]);

  const [currentStep, setCurrentStep] = useState(1);

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
    setQuestions(prev => [...prev, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClose = () => {
    // Reset form
    setQuizData({
      name: '',
      description: '',
      category: '',
      difficulty: 'Easy',
      timeLimit: { hours: 0, minutes: 30 },
    });
    setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
    setCurrentStep(1);
    onClose();
  };

  const handleSave = () => {
    // Validación básica
    if (!quizData.name.trim() || !quizData.description.trim() || !quizData.category.trim()) {
      alert('Please fill in all quiz information fields');
      return;
    }

    if (questions.some(q => !q.question.trim() || q.options.some(opt => !opt.trim()) || !q.answer.trim())) {
      alert('Please fill in all question fields');
      return;
    }
    
    const questionsWithIds = questions.map((question, index) => ({
      ...question,
      id: Date.now() + index 
    }));
    
    const newQuiz: Omit<Quiz, 'id'> = {
      ...quizData,
      questions: questionsWithIds
    };

    addQuiz(newQuiz); 
    handleClose();
  };    


  return {    
    quizData,
    questions,
    currentStep,
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