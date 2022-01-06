import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSortComponent } from './components/filter-sort/filter-sort.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';

@NgModule({
  declarations: [
    FilterSortComponent,
    HeroCardComponent,
    HeroListComponent,
    HeroNewComponent,
    HeroesComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
  ],
})
export class HeroesModule {}
