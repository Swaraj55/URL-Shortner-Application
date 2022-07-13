import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthguardGuard } from '../@url-shortner/helpers/authguard.guard';
import { TeamSectionComponent } from './team-section/team-section.component';

const routes: Routes = [
  //Lazy loading
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  
  {path: 'Home', component: LandingPageComponent},
  {path: 'team', component: TeamSectionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
