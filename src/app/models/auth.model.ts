export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface AuthCredentials {
  email: string;
  password: string;
}