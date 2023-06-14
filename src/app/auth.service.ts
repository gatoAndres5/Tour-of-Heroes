import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Assuming you have a predefined list of users with their credentials
  private users = [
    { username: 'admin', password: 'password', role: 'admin' },
    { username: 'user', password: 'password', role: 'user' }
  ];

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if the user is already logged in based on local storage
    const currentUser = localStorage.getItem('currentUser');
    this.isLoggedInSubject.next(!!currentUser);
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isLoggedInSubject.next(true); // Update the isLoggedInSubject
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  }

  getUserRole(): string {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.role;
    }
    return '';
  }
}



