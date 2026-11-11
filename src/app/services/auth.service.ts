import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthCredentials, LoginResponse, RegisterRequest, UserRole } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private getStorage(): Storage | null {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${environment.apiUrl}/auth/register`, request, {
      responseType: 'text',
    });
  }

  login(credentials: AuthCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials);
  }

  saveToken(token: string): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    const storage = this.getStorage();
    return storage ? storage.getItem('authToken') : null;
  }

  clearToken(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem('authToken');
    }
  }

  saveRole(role: UserRole): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem('userRole', role);
    }
  }

  getUserRole(): UserRole | null {
    const storage = this.getStorage();
    const role = storage ? storage.getItem('userRole') : null;
    return role === 'ADMIN' || role === 'STUDENT' ? role : null;
  }

  clearRole(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem('userRole');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    this.clearRole();
  }
}