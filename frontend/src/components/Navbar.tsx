'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/authService';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const userData = authService.getUser();
        setUser(userData);
      }
      
      setIsLoading(false);

      // Si no está autenticado y está en una ruta protegida, redirige a login
      if (!authenticated && pathname !== '/login' && pathname !== '/register') {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setIsSidebarOpen(false);
    router.push('/login');
  };

  // No mostrar navbar en páginas de autenticación
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  // No mostrar si está cargando
  if (isLoading) {
    return null;
  }

  // Si no está autenticado, no mostrar sidebar
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Botón para abrir sidebar en móvil */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay para cerrar sidebar en móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-800 border-r border-gray-700 shadow-lg transform transition-transform duration-300 z-40 md:relative md:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del Sidebar */}
          <div className="p-6 border-b border-gray-700">
            <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
              Quiz AI
            </Link>
            <p className="text-gray-400 text-sm mt-2">v1.0</p>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Quizzes</span>
            </Link>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Ajustes</span>
              <svg
                className={`h-4 w-4 ml-auto transform transition-transform ${
                  showSettings ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Submenú de Ajustes */}
            {showSettings && (
              <div className="ml-4 space-y-2 border-l border-gray-700 pl-4">
                <Link
                  href="/settings/profile"
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Mi Perfil</span>
                </Link>
                <Link
                  href="/settings/preferences"
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <span>Preferencias</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Usuario y Logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="mb-4 p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Usuario</p>
              <p className="text-white font-medium truncate">{user?.email || 'Usuario'}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
