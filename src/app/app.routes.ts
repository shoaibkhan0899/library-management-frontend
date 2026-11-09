import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
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
		loadComponent: () =>
			import('./features/student/dashboard/dashboard').then((module) => module.StudentDashboard),
	},
	{
		path: 'student/books',
		loadComponent: () => import('./features/student/books/books').then((module) => module.StudentBooks),
	},
	{
		path: 'student/my-books',
		loadComponent: () => import('./features/student/my-books/my-books').then((module) => module.MyBooks),
	},
	{
		path: 'student/reservations',
		loadComponent: () =>
			import('./features/student/reservations/reservations').then((module) => module.Reservations),
	},
	{
		path: 'admin/dashboard',
		loadComponent: () => import('./features/admin/dashboard/dashboard').then((module) => module.AdminDashboard),
	},
	{
		path: 'admin/books',
		loadComponent: () => import('./features/admin/books/books').then((module) => module.AdminBooks),
	},
	{
		path: 'admin/issued-books',
		loadComponent: () =>
			import('./features/admin/issued-books/issued-books').then((module) => module.IssuedBooks),
	},
	{ path: '**', redirectTo: 'login' },
];
