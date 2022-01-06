import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/heroes/models/hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  @Input() heroes: Hero[];
  @Output() loadHeroes = new EventEmitter();

  ngOnInit(): void {}

  updateHeroesList() {
    this.loadHeroes.emit();
  }
}
