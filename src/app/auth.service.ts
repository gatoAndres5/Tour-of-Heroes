import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(false);
  }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<boolean>('http://localhost:9800/api/Login', loginData).pipe(
      tap((loggedIn: boolean) => {
        if (loggedIn) {
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  getUserRole(username: string): Observable<string> {
    return this.http.get<string>(`/api/user/${username}/role`);
  }
  testLoginCollection(): void {
    this.http.get('/api/Login').subscribe((data) => {
      console.log(data);
    });
  }
  
}







