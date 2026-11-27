import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookRequest } from '../../../models/book-request.model';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-admin-book-requests',
  standalone: true,
  templateUrl: './book-requests.html',
  styleUrl: './book-requests.css',
})
export class AdminBookRequests implements OnInit {
  requests: BookRequest[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  actionInProgressId: number | null = null;

  constructor(
    private requestService: RequestService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';

    this.requestService.getAdminBookRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Unable to load book requests. Please try again.';
        this.loading = false;
        console.error(err);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  approve(request: BookRequest): void {
    if (this.actionInProgressId !== null) return;
    const confirmed = window.confirm(
      `Approve request for "${request.bookTitle}" by ${request.userName}?`,
    );
    if (!confirmed) return;

    this.actionInProgressId = request.id;
    this.successMessage = '';
    this.errorMessage = '';

    this.requestService.approveRequest(request.id).subscribe({
      next: () => {
        this.successMessage = `Request for "${request.bookTitle}" approved. Book has been issued.`;
        this.actionInProgressId = null;
        this.loadRequests();
      },
      error: (err) => {
        this.errorMessage = `Unable to approve request for "${request.bookTitle}". Please try again.`;
        this.actionInProgressId = null;
        console.error(err);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  reject(request: BookRequest): void {
    if (this.actionInProgressId !== null) return;
    const confirmed = window.confirm(
      `Reject request for "${request.bookTitle}" by ${request.userName}?`,
    );
    if (!confirmed) return;

    this.actionInProgressId = request.id;
    this.successMessage = '';
    this.errorMessage = '';

    this.requestService.rejectRequest(request.id).subscribe({
      next: () => {
        this.successMessage = `Request for "${request.bookTitle}" has been rejected.`;
        this.actionInProgressId = null;
        this.loadRequests();
      },
      error: (err) => {
        this.errorMessage = `Unable to reject request for "${request.bookTitle}". Please try again.`;
        this.actionInProgressId = null;
        console.error(err);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  pendingCount(): number {
    return this.requests.filter((r) => r.status === 'PENDING').length;
  }
}
