import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Hero } from 'src/app/heroes/models/hero';
import { NewHero } from 'src/app/heroes/models/newHero';
import { PaginatedResult } from 'src/app/heroes/models/heroPagination';
import { HeroParamsService } from './hero-params.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private heroApiAdress: string = environment.apiUrl + 'heroes/';
  private heroes: Hero[] = [];

  constructor(
    private http: HttpClient,
    private heroParamsService: HeroParamsService
  ) {}

  getHeroes() {
    return this.http.get<Hero[]>(this.heroApiAdress).pipe(
      map((heroes) => {
        this.heroes = heroes;
        return this.getPaginatedFilteredSortedHeroes();
      })
    );
  }

  createHero(newHeroModel: NewHero) {
    return this.http.post(this.heroApiAdress, newHeroModel);
  }

  trainHero(heroId: number) {
    return this.http.patch<Hero>(this.heroApiAdress + heroId, '').pipe(
      tap((updatedHero) => {
        let idx = this.heroes.findIndex((hero) => hero.id === updatedHero.id);
        this.heroes[idx] = updatedHero;
      })
    );
  }

  getPaginatedFilteredSortedHeroes() {
    let heroResult: Hero[] = this.heroes;
    let paginatedResult: PaginatedResult = new PaginatedResult();

    heroResult = this.heroParamsService.filterHeroes(heroResult);

    heroResult = this.heroParamsService.orderByHeroes(heroResult);

    paginatedResult.heroes = this.heroParamsService.paginateHeroes(heroResult);

    paginatedResult.pagination =
      this.heroParamsService.getPaginationParams(heroResult);

    return paginatedResult;
  }
}
