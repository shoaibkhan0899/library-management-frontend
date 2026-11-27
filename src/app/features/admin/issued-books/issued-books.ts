import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../../../models/book.model';
import { BookIssue } from '../../../models/book-issue.model';
import { BookService } from '../../../services/book.service';
import { IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-issued-books',
  standalone: true,
  templateUrl: './issued-books.html',
  styleUrl: './issued-books.css',
})
export class IssuedBooks implements OnInit {
  issues: BookIssue[] = [];
  booksById = new Map<number, Book>();
  loading = false;
  errorMessage = '';
  successMessage = '';
  bookDetailsUnavailable = false;
  returningIssueId: number | null = null;

  constructor(
    private issueService: IssueService,
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    this.errorMessage = '';
    this.bookDetailsUnavailable = false;

    let bookDetailsUnavailable = false;

    forkJoin({
      issues: this.issueService.getAdminBookIssues(),
      books: this.bookService.getAllBooks().pipe(
        catchError(() => {
          bookDetailsUnavailable = true;
          return of([] as Book[]);
        }),
      ),
    }).subscribe({
      next: ({ issues, books }) => {
        this.issues = issues;
        this.booksById = new Map(
          books
            .filter((book): book is Book & { id: number } => book.id !== undefined)
            .map((book) => [book.id, book]),
        );
        this.bookDetailsUnavailable = bookDetailsUnavailable;
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.errorMessage = 'Unable to load issued book records. Please try again.';
        this.loading = false;
        console.error(error);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  returnBook(issue: BookIssue): void {
    if (issue.status !== 'ISSUED' || this.returningIssueId !== null) {
      return;
    }

    const confirmed = window.confirm(`Mark "${issue.bookTitle}" as returned?`);
    if (!confirmed) {
      return;
    }

    this.returningIssueId = issue.id;
    this.successMessage = '';
    this.errorMessage = '';

    this.issueService.returnBookIssue(issue.id).subscribe({
      next: (updatedIssue) => {
        this.issues = this.issues.map((currentIssue) =>
          currentIssue.id === updatedIssue.id ? updatedIssue : currentIssue,
        );
        this.returningIssueId = null;
        this.successMessage = `"${issue.bookTitle}" was marked as returned.`;
        this.loadIssues();
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        this.returningIssueId = null;
        this.errorMessage = `Unable to return "${issue.bookTitle}". Please try again.`;
        console.error(error);
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  getBookDetails(bookId: number): Book | undefined {
    return this.booksById.get(bookId);
  }
}