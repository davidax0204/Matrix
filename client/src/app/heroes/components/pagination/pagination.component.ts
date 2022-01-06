import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroParamsService } from '../../services/hero-params.service';
import { HeroPagination } from '../../models/heroPagination';
import { HeroParams } from '../../models/heroParams';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination: HeroPagination;
  @Output() loadHeroes = new EventEmitter();
  heroParams: HeroParams;

  constructor(private heroParamsService: HeroParamsService) {}

  ngOnInit() {}

  pageChanged() {
    this.heroParamsService.setHeroParams(this.heroParams);
    this.loadHeroes.emit();
  }

  nextPage() {
    this.heroParams = this.heroParamsService.getHeroParams();
    if (this.heroParams.pageNumber < this.pagination.totalPages) {
      this.pagination.currentPage++;
      this.heroParams.pageNumber++;
      this.pageChanged();
    }
  }

  previousPage() {
    this.heroParams = this.heroParamsService.getHeroParams();
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.heroParams.pageNumber--;
      this.pageChanged();
    }
  }
}
