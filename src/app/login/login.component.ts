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
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        (response: any) => {
          console.log('Login response:', response);
          if (response.authenticated) {
            console.log('Login successful. Redirecting to dashboard...');
            // Redirect or perform any other necessary action upon successful login
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Login failed. Error:', response.error);
            this.error = response.error; // Display the error message from the server
          }
        },
        (error) => {
          console.error('Failed to authenticate user', error);
          this.error = 'Failed to authenticate user';
        }
      );
  }
  
};
  
