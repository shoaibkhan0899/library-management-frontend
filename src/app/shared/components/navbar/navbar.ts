import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  template: `
    <header class="sticky top-0 z-50 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <nav aria-label="Main navigation" class="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a routerLink="/" class="flex shrink-0 items-center gap-3" aria-label="Library home">
          <span class="grid size-10 place-items-center rounded-lg bg-emerald-900 text-lg font-bold text-white shadow-sm">L</span>
          <span class="hidden sm:block">
            <span class="block text-sm font-bold tracking-wide text-stone-900">THE READING ROOM</span>
            <span class="block text-xs text-stone-500">Library management</span>
          </span>
        </a>

        <div class="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <a routerLink="/login" routerLinkActive="bg-emerald-50 text-emerald-900" [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Login</a>
          <a routerLink="/register" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Register</a>
          <span class="mx-1 h-6 shrink-0 border-l border-stone-200"></span>
          <a routerLink="/student/dashboard" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Student home</a>
          <a routerLink="/student/books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Browse books</a>
          <a routerLink="/student/my-books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">My books</a>
          <a routerLink="/student/reservations" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Reservations</a>
          <span class="mx-1 h-6 shrink-0 border-l border-stone-200"></span>
          <a routerLink="/admin/dashboard" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Admin home</a>
          <a routerLink="/admin/books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Manage books</a>
          <a routerLink="/admin/issued-books" routerLinkActive="bg-emerald-50 text-emerald-900" ariaCurrentWhenActive="page" class="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-950">Issued books</a>
        </div>
      </nav>
    </header>
  `,
})
export class Navbar {}