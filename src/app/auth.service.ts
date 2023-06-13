import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  // Assuming you have a predefined list of users with their credentials
  private users = [
    { username: 'admin', password: 'password', role: 'admin' },
    { username: 'user', password: 'password', role: 'user' }
  ];

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      // Save user information to local storage or session storage for further use
      localStorage.setItem('currentUser', JSON.stringify(user));

      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  }

  // Other AuthService code...
}
