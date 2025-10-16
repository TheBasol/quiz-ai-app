import { QuestionCard } from "@/components/QuestionCard";
import { quiz } from "@/data/questions";
import { getIdFromSlug } from "@/utils";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function QuestionsPage({ params }: Props) {
    const { id } = await params;
    
    const { actualId, name } = getIdFromSlug(id);

    const currentQuiz = quiz.find(q => q.id === Number(actualId));

    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
        {/* Back to Home Button - Top left of the page */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-10">
          <Link 
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-500"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        {currentQuiz && <QuestionCard quiz={currentQuiz} />}
      </div>
    );
}