'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz } from '@/interfaces';
import { Timer } from '@/utils'; 

export const useQuizEngine = (quiz: Quiz) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [resultsList, setResultsList] = useState<string[]>([]);
  const [timeQuiz, setTimeQuiz] = useState('00:00:00');
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();

    // --- Timer ---
  const myTimer = useMemo(() => {
    const handleTick = (time: { hours: number; minutes: number; seconds: number }) => {
      const h = time.hours.toString().padStart(2, '0');
      const m = time.minutes.toString().padStart(2, '0');
      const s = time.seconds.toString().padStart(2, '0');
      setTimeQuiz(`${h}:${m}:${s}`);
    };

    return new Timer(quiz.timeLimit, handleTick);
  }, [quiz.timeLimit]);

  useEffect(() => {
    myTimer.start();
    return () => {
      myTimer.stop();
    };
  }, [myTimer]);


  const currentQuestion = quiz.questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = quiz.questions.length;

  // --- Event Handlers ---
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    
    setResultsList((prev) => {
        const newResults = [...prev];
        newResults[currentQuestionIndex] = answerId;
        return newResults;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
        setShowResult(true);
        setTimeout(() => {
            setShowResult(false);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(resultsList[currentQuestionIndex + 1] || ''); 
        }, 2000); 
    } else {
      myTimer.stop();
      
      const { score, percentage } = getFinalResults();
      
      router.push(`/results?quizId=${quiz.id}&score=${score}&total=${totalQuestions}&percentage=${percentage}&timeSpent=${timeQuiz}`);
    }
  };

  const getFinalResults = () => {
      const score = resultsList.filter((answer, index) => 
        answer === quiz.questions[index].answer
      ).length;
      
      const percentage = Math.round((score / totalQuestions) * 100);
      return { score, total: totalQuestions, percentage, timeSpent: timeQuiz };
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(resultsList[currentQuestionIndex - 1] || ''); 
    }
  };


  return {
    questionNumber,
    totalQuestions,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    timeQuiz,
    showResult,
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
  };
};