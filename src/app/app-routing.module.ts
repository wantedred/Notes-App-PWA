import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { AddCardComponent } from './modules/time-card/add-card/add-card.component';
import { TimeCardComponent } from './modules/time-card/time-card.component';
import { ViewCardComponent } from './modules/time-card/view-card/view-card.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'add', component: AddCardComponent, pathMatch: 'full'},
  { path: 'notes', component: TimeCardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
