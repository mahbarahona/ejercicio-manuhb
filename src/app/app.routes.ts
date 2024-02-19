import { Routes } from '@angular/router';
import { PAGES } from './models';

export const routes: Routes = [
  {
    path: PAGES.HOME,
    loadComponent: () =>
      import('./ui/pages/page-home/page-home.component').then(
        (c) => c.PageHomeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
