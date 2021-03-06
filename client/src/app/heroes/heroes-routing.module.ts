import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new',
        component: HeroNewComponent,
      },
      {
        path: 'my',
        component: HeroesComponent,
      },
      {
        path: 'all',
        component: HeroesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
