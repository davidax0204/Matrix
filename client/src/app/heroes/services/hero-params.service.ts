import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroPagination } from '../models/heroPagination';
import { HeroParams } from '../models/heroParams';

@Injectable({
  providedIn: 'root',
})
export class HeroParamsService {
  heroParams: HeroParams;

  constructor() {
    this.heroParams = new HeroParams();
  }

  getHeroParams() {
    const params = JSON.parse(sessionStorage.getItem('pagination'));
    if (params) {
      return (this.heroParams = params);
    }
    return this.heroParams;
  }

  setHeroParams(params: HeroParams) {
    sessionStorage.setItem('pagination', JSON.stringify(params));
    this.heroParams = params;
  }

  autoSetParams() {
    const pagination = JSON.parse(sessionStorage.getItem('pagination'));
    if (pagination) {
      this.setHeroParams(pagination);
    }
  }

  resetHeroParams() {
    sessionStorage.removeItem('pagination');
    return (this.heroParams = new HeroParams());
  }

  filterHeroes(heroes: Hero[]) {
    if (this.heroParams.whoseHeroes != '') {
      heroes = heroes.filter(
        (hero) => hero.appUserId == this.heroParams.whoseHeroes
      );
    }

    if (this.heroParams.ability != 'all') {
      heroes = heroes.filter((hero) => hero.ability == this.heroParams.ability);
    }

    heroes = heroes.filter((hero) => {
      return (
        hero.currentPower >= this.heroParams.minCurrentPower &&
        hero.currentPower <= this.heroParams.maxCurrentPower
      );
    });

    return heroes;
  }

  orderByHeroes(heroes: Hero[]) {
    switch (this.heroParams.orderBy) {
      case 'name': {
        heroes = heroes.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      }
      case 'created': {
        heroes = heroes.sort((a, b) => (a.created > b.created ? 1 : -1));
        break;
      }
      default: {
        heroes = heroes.sort((a, b) => a.currentPower - b.currentPower);
        break;
      }
    }

    return heroes;
  }

  paginateHeroes(heroes: Hero[]) {
    heroes = heroes.slice(
      this.heroParams.pageSize * (this.heroParams.pageNumber - 1),
      this.heroParams.pageSize * this.heroParams.pageNumber
    );

    return heroes;
  }

  getPaginationParams(heroes: Hero[]) {
    let paginationParams = new HeroPagination(
      this.heroParams.pageNumber,
      this.heroParams.pageSize,
      heroes.length,
      Math.ceil(heroes.length / this.heroParams.pageSize)
    );

    return paginationParams;
  }
}
