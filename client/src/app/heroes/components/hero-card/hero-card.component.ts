import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Hero } from 'src/app/heroes/models/hero';
import { AccountService } from 'src/app/account/account.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Hero;
  @Output() updateHeroesList = new EventEmitter();
  colors: string[];

  constructor(
    public accountService: AccountService,
    public heroesService: HeroesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.seperateColorsWithComma();
  }

  seperateColorsWithComma() {
    if (this.hero) {
      this.colors = this.hero.suitColors.split(', ');
    }
  }

  trainHero(hero: Hero) {
    this.heroesService.trainHero(hero.id).subscribe(() => {
      this.updateHeroesList.emit();
      this.toastr.success(`${hero.name} was successfully trained!`);
    });
  }
}
