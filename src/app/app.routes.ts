import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calendar',
    loadComponent: () =>
      import('./containers/appointment-page/appointment-page.component').then(
        (m) => m.AppointmentPageComponent
      ),
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];
