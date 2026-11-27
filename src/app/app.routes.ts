import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing').then((module) => module.Landing),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((module) => module.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((module) => module.Register),
  },
  {
    path: 'student/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' },
    loadComponent: () =>
      import('./features/student/dashboard/dashboard').then((module) => module.StudentDashboard),
  },
  {
    path: 'student/books',
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' },
    loadComponent: () =>
      import('./features/student/books/browse-books').then((module) => module.StudentBooks),
  },
  {
    path: 'student/my-books',
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' },
    loadComponent: () => import('./features/student/my-books/my-books').then((module) => module.MyBooks),
  },
  {
    path: 'student/my-requests',
    canActivate: [authGuard, roleGuard],
    data: { role: 'STUDENT' },
    loadComponent: () =>
      import('./features/student/my-requests/my-requests').then((module) => module.MyRequests),
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () => import('./features/admin/dashboard/dashboard').then((module) => module.AdminDashboard),
  },
  {
    path: 'admin/books',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () => import('./features/admin/books/books').then((module) => module.AdminBooks),
  },
  {
    path: 'admin/issued-books',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/issued-books/issued-books').then((module) => module.IssuedBooks),
  },
  {
    path: 'admin/book-requests',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    loadComponent: () =>
      import('./features/admin/book-requests/book-requests').then((module) => module.AdminBookRequests),
  },
  { path: '**', redirectTo: '' },
];
