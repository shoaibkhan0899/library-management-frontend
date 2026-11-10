export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'ADMIN' | 'STUDENT';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  role: UserRole;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}