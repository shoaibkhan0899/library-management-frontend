import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { IssueService } from '../../../services/issue.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-[calc(100vh-73px)] bg-stone-100">
      <div class="mx-auto flex max-w-7xl gap-6 px-4 py-8">
        <aside class="w-72 rounded-3xl bg-emerald-900 p-5 text-white shadow-lg">
          <div class="mb-8">
            <p class="text-sm uppercase tracking-[0.24em] text-emerald-200">Admin panel</p>
            <h1 class="mt-2 text-2xl font-bold">Dashboard</h1>
          </div>

          <nav class="space-y-2">
            <a routerLink="/admin/dashboard" routerLinkActive="bg-white/10" [routerLinkActiveOptions]="{ exact: true }" class="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-white/10">Overview</a>
            <a routerLink="/admin/books" routerLinkActive="bg-white/10" class="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-white/10">Manage books</a>
            <a routerLink="/admin/issued-books" routerLinkActive="bg-white/10" class="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-white/10">Issued books</a>
            <a routerLink="/admin/book-requests" routerLinkActive="bg-white/10" class="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-emerald-50 transition hover:bg-white/10">Book requests</a>
          </nav>

          <button type="button" (click)="logout()" class="mt-8 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10">Logout</button>
        </aside>

        <main class="flex-1 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Welcome back</p>
          <h2 class="mt-3 text-3xl font-bold text-stone-900">Admin dashboard</h2>
          <p class="mt-3 max-w-2xl text-stone-600">Track library activity, manage inventory, and review issued books from one place.</p>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <a routerLink="/admin/books" class="block rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:bg-stone-100">
              <p class="text-sm font-medium text-stone-500">Total Books</p>
              <p class="mt-2 text-3xl font-bold text-stone-900">{{ loading ? '...' : totalBooks }}</p>
              <span class="mt-2 inline-block text-xs font-semibold text-emerald-700">Manage catalog &rarr;</span>
            </a>

            <a routerLink="/admin/issued-books" class="block rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:bg-stone-100">
              <p class="text-sm font-medium text-stone-500">Active Issues</p>
              <p class="mt-2 text-3xl font-bold text-stone-900">{{ loading ? '...' : totalIssued }}</p>
              <span class="mt-2 inline-block text-xs font-semibold text-emerald-700">View issued &rarr;</span>
            </a>

            <a routerLink="/admin/book-requests" class="block rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:bg-stone-100">
              <p class="text-sm font-medium text-stone-500">Pending Requests</p>
              <p class="mt-2 text-3xl font-bold text-amber-700">{{ loading ? '...' : pendingRequests }}</p>
              <span class="mt-2 inline-block text-xs font-semibold text-emerald-700">Review requests &rarr;</span>
            </a>
          </div>

          <div class="mt-8 rounded-2xl border border-stone-200 bg-emerald-50/50 p-6">
            <h3 class="text-base font-semibold text-emerald-950">Quick Actions</h3>
            <div class="mt-4 flex flex-wrap gap-3">
              <a routerLink="/admin/books" class="inline-flex items-center rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Add / Manage Books
              </a>
              <a routerLink="/admin/book-requests" class="inline-flex items-center rounded-xl border border-emerald-800 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50">
                Process Requests ({{ pendingRequests }})
              </a>
              <a routerLink="/admin/issued-books" class="inline-flex items-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50">
                Return Books
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AdminDashboard implements OnInit {
  totalBooks = 0;
  totalIssued = 0;
  pendingRequests = 0;
  loading = false;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
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
      books: this.bookService.getAllBooks().pipe(catchError(() => of([]))),
      issues: this.issueService.getAdminBookIssues().pipe(catchError(() => of([]))),
      requests: this.requestService.getAdminBookRequests().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ books, issues, requests }) => {
        this.totalBooks = books.length;
        this.totalIssued = issues.filter((i) => i.status === 'ISSUED').length;
        this.pendingRequests = requests.filter((r) => r.status === 'PENDING').length;
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
