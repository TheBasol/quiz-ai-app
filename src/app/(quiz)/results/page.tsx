import { StatCard } from "@/components/StatCard";
import { getResultColor, getResultGradient, getResultMessage } from "@/utils";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams;
  const quizId = params.quizId as string;
  const score = Number(params.score);
  const total = Number(params.total);
  const timeSpent = params.timeSpent as string;
  const percentage = Number(params.percentage);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Back to Home Button */}
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

      {/* Results Container */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${getResultGradient(percentage)} px-6 sm:px-8 py-8 text-center`}>
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                {percentage >= 80 ? (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : percentage >= 60 ? (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Quiz Complete!
            </h1>
            <p className="text-white/80 text-lg sm:text-xl">
              {getResultMessage(percentage)}
            </p>
          </div>

          {/* Results Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Score Circle */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-8 border-gray-700 flex flex-col items-center justify-center ${getResultColor(percentage)}`}>
                  <span className="text-3xl sm:text-4xl font-bold">
                    {percentage}%
                  </span>
                  <span className="text-sm text-gray-400">
                    {score}/{total}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <StatCard iconName="correct" label="Correct Answers" value={score} />
              <StatCard iconName="time" label="Time Spent" value={timeSpent} />
              <StatCard iconName="totalQuestions" label="Total Questions" value={total} />


            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/questions/${quizId}`}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center hover:shadow-lg hover:shadow-purple-500/25"
              >
                Retake Quiz
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center hover:shadow-lg border border-gray-600 hover:border-gray-500"
              >
                Back to Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}