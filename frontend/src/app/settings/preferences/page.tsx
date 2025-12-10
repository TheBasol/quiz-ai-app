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
    // Cargar preferencias guardadas
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
            {/* Notificaciones */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Notificaciones
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Recibe notificaciones sobre nuevos quizzes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={preferences.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {/* Modo Oscuro */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Modo Oscuro
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Usar tema oscuro en toda la aplicación
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={preferences.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

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
                ✓ Los cambios se guardan automáticamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
