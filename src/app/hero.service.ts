import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'http://localhost:16900/api/heroes';  // URL to web API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //withCredentials: true
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero, username: string): Observable<Hero> {
    const url = `${this.heroesUrl}?username=${username}`;
    return this.http.post<Hero>(url, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this.log(`added hero with id=${newHero.id}`); // Log the ID of the added hero
        // Assign the ID of the added hero to the hero object
        hero.id = newHero.id;
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number, username: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}?username=${username}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
  
  
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
