import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroParamsService } from '../../services/hero-params.service';
import { HeroParams } from '../../models/heroParams';
import { User } from 'src/app/account/models/user';

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.css'],
})
export class FilterSortComponent implements OnInit {
  @Output() loadHeroes = new EventEmitter();
  @Input() isMyHeroes: boolean;

  heroParams: HeroParams;
  activeUserId: string;

  previousPageSize;

  abilityList = [];
  sortByList = [];
  heroesPerPageList = [];

  constructor(private heroParamsService: HeroParamsService) {}

  ngOnInit(): void {
    this.heroParams = this.heroParamsService.getHeroParams();

    this.previousPageSize = this.heroParams.pageSize;

    if (this.isMyHeroes) {
      const activeUser: User = JSON.parse(sessionStorage.getItem('user'));
      this.heroParams.whoseHeroes = activeUser.id;
      this.activeUserId = activeUser.id;
      this.heroParamsService.setHeroParams(this.heroParams);
    }

    this.paramsListsInit();
  }

  ngOnDestroy() {
    this.heroParams.pageNumber = 1;
    this.heroParams.whoseHeroes = '';
    this.heroParamsService.setHeroParams(this.heroParams);
  }

  paramsListsInit() {
    this.abilityList = [
      { value: 'all', description: 'All' },
      { value: 'attacker', description: 'Attacker' },
      { value: 'defender', description: 'Defender' },
    ];
    this.sortByList = [
      { value: 'currentPower', description: 'Current Power' },
      { value: 'name', description: 'Name' },
      { value: 'created', description: 'Training Since' },
    ];
    this.heroesPerPageList = [
      { value: 5, description: 5 },
      { value: 10, description: 10 },
      { value: 20, description: 20 },
      { value: 50, description: 50 },
    ];
  }

  setFilters() {
    if (this.previousPageSize !== this.heroParams.pageSize) {
      this.heroParams.pageNumber = 1;
    }
    this.previousPageSize = this.heroParams.pageSize;

    this.heroParamsService.setHeroParams(this.heroParams);

    this.loadHeroes.emit();
  }

  resetFilters() {
    this.heroParams = this.heroParamsService.resetHeroParams();
    if (this.activeUserId) {
      this.heroParams.whoseHeroes = this.activeUserId;
    }
    this.setFilters();
  }
}
