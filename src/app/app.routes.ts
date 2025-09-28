import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./doc'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
