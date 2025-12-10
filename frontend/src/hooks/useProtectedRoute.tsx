'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';

export function useProtectedRoute() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      
      if (!authenticated) {
        router.push('/login');
      }
      
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
}
