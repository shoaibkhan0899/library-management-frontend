import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookIssue } from '../models/book-issue.model';

@Injectable({ providedIn: 'root' })
export class IssueService {
	private readonly apiUrl = `${environment.apiUrl}/admin/book-issues`;

	constructor(private http: HttpClient) {}

	getAdminBookIssues(): Observable<BookIssue[]> {
		return this.http.get<BookIssue[]>(this.apiUrl);
	}

	returnBookIssue(issueId: number): Observable<BookIssue> {
		return this.http.post<BookIssue>(`${this.apiUrl}/${issueId}/return`, null);
	}
}