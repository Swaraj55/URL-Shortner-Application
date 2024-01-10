// Generate this file using command: ng g guard authguard

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard  {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    // console.log("Route...",route)
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser)
    console.log(this.authenticationService.isAuthenticatedUser())
    if(!this.authenticationService.isAuthenticatedUser()){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
