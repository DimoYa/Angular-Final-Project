import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './feature/pages/landing/landing.component';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LandingComponent },
  { path: '**', component: NotFoundComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);