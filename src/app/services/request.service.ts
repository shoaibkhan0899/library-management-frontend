import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookRequest } from '../models/book-request.model';

@Injectable({ providedIn: 'root' })
export class RequestService {
  private readonly adminApiUrl = `${environment.apiUrl}/admin/book-requests`;
  private readonly studentApiUrl = `${environment.apiUrl}/student/book-requests`;

  constructor(private http: HttpClient) {}

  // Admin: Get all requests
  getAdminBookRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(this.adminApiUrl);
  }

  // Admin: Approve a pending request
  approveRequest(requestId: number): Observable<BookRequest> {
    return this.http.post<BookRequest>(`${this.adminApiUrl}/${requestId}/approve`, null);
  }

  // Admin: Reject a pending request
  rejectRequest(requestId: number): Observable<BookRequest> {
    return this.http.post<BookRequest>(`${this.adminApiUrl}/${requestId}/reject`, null);
  }

  // Student: Get own requests
  getMyRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`${this.studentApiUrl}/my`);
  }
}
