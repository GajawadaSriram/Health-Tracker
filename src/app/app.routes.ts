// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrackingPageComponent } from './components/tracking-page/tracking-page.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracking', component: TrackingPageComponent },
];
