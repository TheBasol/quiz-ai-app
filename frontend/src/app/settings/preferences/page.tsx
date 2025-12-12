'use client';

import React, { useState, useEffect } from 'react';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: true,
    language: 'es',
    difficulty: 'medium',
  });

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    const updated = {
      ...preferences,
      [name]: newValue,
    };

    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Preferencias</h1>

          <div className="space-y-6">

            {/* Idioma */}
            <div className="bg-gray-700 rounded-lg p-6">
              <label htmlFor="language" className="block text-lg font-semibold text-white mb-3">
                Idioma
              </label>
              <select
                id="language"
                name="language"
                value={preferences.language}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Dificultad Predeterminada */}
            <div className="bg-gray-700 rounded-lg p-6">
              <label htmlFor="difficulty" className="block text-lg font-semibold text-white mb-3">
                Dificultad Predeterminada
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={preferences.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="easy">Fácil</option>
                <option value="medium">Medio</option>
                <option value="hard">Difícil</option>
              </select>
            </div>

            <div className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg p-4 mt-6">
              <p className="text-blue-200 text-sm">
                ✓ Changes are saved automatically
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
