import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthCredentials, LoginResponse, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient) {}

	register(request: RegisterRequest): Observable<string> {
		return this.http.post(`${environment.apiUrl}/auth/register`, request, {
			responseType: 'text',
		});
	}

	login(credentials: AuthCredentials): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials);
	}

	saveToken(token: string): void {
		sessionStorage.setItem('authToken', token);
	}
}