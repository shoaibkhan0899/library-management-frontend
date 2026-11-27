import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { IssueService } from '../../../services/issue.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class StudentDashboard implements OnInit {
  issuedCount = 0;
  pendingRequestsCount = 0;
  dueSoonCount = 0;
  loading = false;

  constructor(
    private authService: AuthService,
    private issueService: IssueService,
    private requestService: RequestService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    forkJoin({
      issues: this.issueService.getStudentMyIssues().pipe(catchError(() => of([]))),
      requests: this.requestService.getMyRequests().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ issues, requests }) => {
        const activeIssues = issues.filter((i) => i.status === 'ISSUED');
        this.issuedCount = activeIssues.length;
        this.pendingRequestsCount = requests.filter((r) => r.status === 'PENDING').length;

        // Check books due within the next 3 days or already overdue
        const threshold = new Date();
        threshold.setDate(threshold.getDate() + 3);

        this.dueSoonCount = activeIssues.filter((i) => {
          if (!i.dueDate) return false;
          const due = new Date(i.dueDate);
          return !isNaN(due.getTime()) && due <= threshold;
        }).length;

        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
