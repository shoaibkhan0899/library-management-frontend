import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookIssue } from '../../../models/book-issue.model';
import { IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-books.html',
  styleUrl: './my-books.css',
})
export class MyBooks implements OnInit {
  issues: BookIssue[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private issueService: IssueService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadMyBooks();
  }

  loadMyBooks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.issueService.getStudentMyIssues().subscribe({
      next: (data) => {
        this.issues = data;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Unable to load your issued books. Please try again.';
        this.loading = false;
        console.error(err);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  issuedCount(): number {
    return this.issues.filter((i) => i.status === 'ISSUED').length;
  }
}
