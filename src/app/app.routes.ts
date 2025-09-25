import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () => import('./doc'),
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];
