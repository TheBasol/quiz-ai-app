interface GenerationProgressProps {
  generationStep: string;
}
export const GenerationProgress = ({ generationStep }: GenerationProgressProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-6 relative">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
        <svg className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Generating Your Quiz</h3>
      <p className="text-indigo-300 text-lg mb-4">{generationStep}</p>
      <div className="w-64 mx-auto bg-gray-700 rounded-full h-2">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse"></div>
      </div>
      <p className="text-gray-400 text-sm mt-4">This may take a few moments...</p>
    </div>
  );
}