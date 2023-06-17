import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AuthService } from '../auth.service';
import { Observable, map, of } from 'rxjs';

@Component({
selector: 'app-heroes',
templateUrl: './heroes.component.html',
styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
heroes: Hero[] = [];
canEdit$: Observable<boolean> = of(false); // Set a default value

constructor(private heroService: HeroService, private authService: AuthService) {}

ngOnInit(): void {
this.getHeroes();
this.canEdit$ = this.authService.isLoggedIn$.pipe(
map(() => this.authService.getUsername()),
map(username => username === 'admin')
);
}

getHeroes(): void {
this.heroService.getHeroes()
.subscribe(heroes => this.heroes = heroes);
}

add(name: string): void {
name = name.trim();
if (!name) { return; }
this.canEdit$.subscribe(canEdit => {
  if (canEdit) {
    const username = this.authService.getUsername();
    this.heroService.addHero({ name } as Hero, username)
      .subscribe(
        hero => {
          this.heroes.push(hero);
        },
        error => {
          console.error(error);
        }
      );
  }
});
}

delete(hero: Hero): void {
this.canEdit$.subscribe(canEdit => {
if (canEdit) {
const username = this.authService.getUsername();
// Only allow deletion for admin users
this.heroes = this.heroes.filter(h => h !== hero);
this.heroService.deleteHero(hero.id, username).subscribe();
}
});
}
}
