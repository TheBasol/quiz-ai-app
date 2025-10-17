'use client';
import { useState } from "react";
import { ModalAddQuiz } from "./ModalAddQuiz";
import { Quiz } from "@/interfaces";
import { quiz } from "@/data/questions";

export const ButtonsAddModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveQuiz = (newQuiz: Omit<Quiz, 'id'>) => {
        // Aquí guardarías el quiz en tu estado/base de datos
        (quiz as Quiz[]).push({
        id: quiz.length + 1, // Generar un ID simple basado en la longitud actual
        ...newQuiz
        });
        console.log('New quiz:', newQuiz);
    };


    return (
        <>
          {/* Action Buttons */}
          <div 
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Quiz Manually
            </button>
            
            <button className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Generate with AI
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">New</span>
            </button>
          </div> 
            <ModalAddQuiz 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveQuiz}
            />       
        </>

    )
}