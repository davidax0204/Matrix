import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Hero } from '../../models/hero';
import { HeroPagination, PaginatedResult } from '../../models/heroPagination';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  pagination: HeroPagination;
  isMyHeroes = this.activatedRoute.snapshot.url[0].path == 'my' ? true : false;

  paginatedResultSub: Subscription;

  constructor(
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paginatedResultSub = this.HeroesService.getHeroes().subscribe(
      (paginatedResult) => {
        this.pagination = paginatedResult.pagination;
        this.heroes = paginatedResult.heroes;
      }
    );
  }

  ngOnDestroy(): void {
    this.paginatedResultSub.unsubscribe();
  }

  loadHeroes() {
    let paginatedResult: PaginatedResult<Hero[]> =
      this.HeroesService.getPaginatedFilteredSortedHeroes();

    this.heroes = paginatedResult.heroes;
    this.pagination = paginatedResult.pagination;
  }
}
