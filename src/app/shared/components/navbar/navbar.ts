import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  template: `
    <header class="sticky top-0 z-50 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <nav aria-label="Main navigation" class="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex shrink-0 items-center gap-3" aria-label="Library home">
          <span class="grid size-10 place-items-center rounded-lg bg-emerald-900 text-lg font-bold text-white shadow-sm">L</span>
          <span class="hidden sm:block">
            <span class="block text-sm font-bold tracking-wide text-stone-900">Campus Library</span>
            <span class="block text-xs text-stone-500">Library management</span>
          </span>
        </a>

        @if (isLoggedIn) {
          <div class="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span class="mx-1 h-6 shrink-0 border-l border-stone-200"></span>
            @if (userRole === 'STUDENT') {
              <a routerLink="/student/dashboard" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Student home</a>
              <a routerLink="/student/books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Browse books</a>
              <a routerLink="/student/my-books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">My books</a>
              <a routerLink="/student/reservations" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Reservations</a>
            }

            @if (userRole === 'ADMIN') {
              <a routerLink="/admin/dashboard" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Admin home</a>
              <a routerLink="/admin/books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Manage books</a>
              <a routerLink="/admin/issued-books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Issued books</a>
            }
          </div>
        }

        <div aria-label="Account navigation" class="ml-auto flex shrink-0 items-center gap-1 border-l border-stone-200 pl-3">
          @if (!isLoggedIn) {
            <a routerLink="/login" routerLinkActive="bg-emerald-50 text-emerald-900" [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Login</a>
            <a routerLink="/register" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Register</a>
          } @else {
            <button type="button" (click)="logout()" class="shrink-0 rounded-md bg-emerald-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800">Logout</button>
          }
        </div>
      </nav>
    </header>
  `,
})
export class Navbar {
  isLoggedIn = false;
  userRole: 'ADMIN' | 'STUDENT' | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.syncAuthState();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.syncAuthState();
      }
    });
  }

  private syncAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}