import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home').then((page) => page.Home), title: 'Nexo | Software, dados, automação e inteligência artificial' },
  { path: '**', redirectTo: '' },
];
