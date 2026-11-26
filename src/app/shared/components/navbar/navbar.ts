import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
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