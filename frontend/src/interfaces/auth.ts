export interface User {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  email?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface FormCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
