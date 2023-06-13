import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assuming you have an AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.error = ''; // Reset any previous error message

    // Perform login authentication
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      // Redirect or perform any other necessary action upon successful login
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid username or password'; // Display error message for failed login attempts
    }
  }
}


