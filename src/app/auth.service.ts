
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
private username: string = ''; // Add a property to hold the username
public role: string = ''; // Add a property to hold the role

constructor(private http: HttpClient) {
this.isLoggedInSubject.next(false);
}

login(loginData: { username: string, password: string }): Observable<boolean> {
return this.http.post<boolean>('http://localhost:14040/api/login', loginData).pipe(
tap((loggedIn: boolean) => {
if (loggedIn) {
this.isLoggedInSubject.next(true);
this.username = loginData.username; // Set the username property upon successful login
this.role = this.getRoleFromUsername(loginData.username); // Set the role based on the username
}
})
);
}

private getRoleFromUsername(username: string): string {
// Logic to determine the role based on the username
if (username === 'admin') {
return 'admin';
} else if (username === 'user') {
return 'user';
}
return ''; // Set a default role if username doesn't match any specific role
}

testLoginCollection(): void {
this.http.get('/api/Login').subscribe((data) => {
console.log(data);
});
}

getUsername(): string {
// Return the value of the username property
return this.username;
}

logout(): void {
this.isLoggedInSubject.next(false);
this.username = ''; // Clear the username property on logout
this.role = ''; // Clear the role property on logout
}
}