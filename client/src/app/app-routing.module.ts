import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/errors/server-error/server-error.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'heroes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./heroes/heroes.module').then((module) => module.HeroesModule),
  },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
