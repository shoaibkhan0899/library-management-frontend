import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
          </nav>

          <button type="button" (click)="logout()" class="mt-8 w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10">Logout</button>
        </aside>

        <main class="flex-1 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Welcome back</p>
          <h2 class="mt-3 text-3xl font-bold text-stone-900">Admin dashboard</h2>
          <p class="mt-3 max-w-2xl text-stone-600">Track library activity, manage inventory, and review issued books from one place.</p>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p class="text-sm text-stone-500">Books</p>
              <p class="mt-2 text-3xl font-bold text-stone-900">120</p>
            </div>
            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p class="text-sm text-stone-500">Issued</p>
              <p class="mt-2 text-3xl font-bold text-stone-900">34</p>
            </div>
            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p class="text-sm text-stone-500">Members</p>
              <p class="mt-2 text-3xl font-bold text-stone-900">420</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class AdminDashboard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}