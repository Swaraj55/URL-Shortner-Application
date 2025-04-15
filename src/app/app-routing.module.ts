import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthguardGuard } from '../@url-shortner/helpers/authguard.guard';
import { TeamSectionComponent } from './team-section/team-section.component';

const routes: Routes = [
  //Lazy loading
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  
  {path: 'home', component: LandingPageComponent},
  {path: 'team', component: TeamSectionComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
