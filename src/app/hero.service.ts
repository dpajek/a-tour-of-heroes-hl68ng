import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';

import { Observable, of } from 'rxjs';

import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root', // Registers it as a. provider at the root level so any class can access it
})
export class HeroService {

  constructor(private messageService: MessagesService) { }

  // no longre works if async DB used
  getHeroes_old(): Hero[] {
    return HEROES;
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

}