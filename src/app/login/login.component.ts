import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  login(): void {
    this.error = ''; // Reset any previous error message

    // Perform login authentication
    this.authService.login(this.username, this.password)
      .subscribe(
        (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            // Redirect or perform any other necessary action upon successful login
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Invalid username or password'; // Display error message for failed login attempts
          }
        },
        (error) => {
          console.error('Failed to authenticate user', error);
          this.error = 'Failed to authenticate user';
        }
      );
  }
}








