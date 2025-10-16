import { Question } from "@/interfaces";
import { getAnswerStyles } from "@/utils/utils";
import { useState } from "react";

interface AnswerQuestionProps {
    option: string;
    showResult?: boolean;
    currentSelectedAnswer: string;
    index: number;
    currentQuestion: Question;
    handleAnswerSelect: (answerId: string) => void;
}

export const AnswerQuestion = ({ option, showResult = false, currentSelectedAnswer, currentQuestion, handleAnswerSelect, index }: AnswerQuestionProps) => {
    
    const [hoveredAnswer, setHoveredAnswer] = useState<string>("");
    
    return (
        <button
            onClick={() => !showResult && handleAnswerSelect(option)}
            onMouseEnter={() => setHoveredAnswer(option)}
            onMouseLeave={() => setHoveredAnswer("")}
            className={getAnswerStyles(
                option,
                showResult,
                currentSelectedAnswer,
                hoveredAnswer,
                currentQuestion
            )}
            disabled={showResult}
        >
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-sm sm:text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-left text-base sm:text-base">{option}</span>
                {hoveredAnswer === option && (
                    <div className="absolute left-0 right-0 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                        {option}
                    </div>
                )}
            </div>
        </button>
    )
}