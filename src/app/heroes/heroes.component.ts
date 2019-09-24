import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]; // declares as an array of type Hero
  selectedHero: Hero; // declares as type Hero

  // Inject the service
  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    // implies that heroes is grabbed synchronously, but with a. real server, it will need to be async (because the service must wait for the server to respond and the browser won't block)
    //this.heroes = this.heroService.getHeroes();

    //wait for the observable to emit an array of heroes
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: String): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}