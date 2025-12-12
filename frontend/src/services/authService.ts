import { BACKEND_URL } from '@/config';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '@/interfaces/auth';

const API_URL = BACKEND_URL;

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      console.log('authService login response data:', data);

      if (response.ok && data.Token) {
        localStorage.setItem('token', data.Token);
        localStorage.setItem('tokenExpiration', data.Expiration);
        
        return {
          success: true,
          message: 'Login successful',
          email: credentials.email,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection error',
      };
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });


      const data = await response.json();

      console.log('authService register response data:', data);
      console.log('authService register response ok:', response.ok);

      if (response.ok && data.Token) {
        localStorage.setItem('token', data.Token);
        localStorage.setItem('tokenExpiration', data.Expiration);
        
        return {
          success: true,
          message: 'Registration successful',
          email: credentials.email,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection error',
      };
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const token = localStorage.getItem('token');
    console.log('authService getUser token:', localStorage);
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email || '',
      };
    } catch {
      return null;
    }
  },

    getAuthHeaders(): Record<string, string> {

        var token = this.getToken();

        const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (!token || !expiration) return false;

    const expirationDate = new Date(expiration);
    return expirationDate > new Date();
  },
};