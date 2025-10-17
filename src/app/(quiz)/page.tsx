
import { ButtonsAddModal } from '@/components/ButtonsAddModal';
import { QuizGrid } from '@/components/QuizGrid';

export default function QuizPage() {



  //zustand para ekl estado global de quiz
  //hace run hook para manejar la logica de los botones
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-purple-400">Quiz AI App</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Choose from our collection of engaging quizzes and test your knowledge across different topics
          </p>
          <ButtonsAddModal />
        </div>

        {/* Quiz Grid */}
        <QuizGrid />


      </div>
    </div>
  );
}