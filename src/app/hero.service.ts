import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes'
import { Hero } from './hero';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes():Observable<Hero[]>{
    const heroes = of(HEROES);
    this.messageService.add('Hero Service: fetched heroes')
    return heroes;
  }
  constructor(private messageService:MessageService) { }
}
