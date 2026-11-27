import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookRequest } from '../../../models/book-request.model';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-requests.html',
  styleUrl: './my-requests.css',
})
export class MyRequests implements OnInit {
  requests: BookRequest[] = [];
  loading = false;
  errorMessage = '';

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

    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Unable to load your book requests. Please try again.';
        this.loading = false;
        console.error(err);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  pendingCount(): number {
    return this.requests.filter((r) => r.status === 'PENDING').length;
  }
}
