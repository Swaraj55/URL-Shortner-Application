// Generate this file with: ng g interceptor jwt

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('JwtInterceptor', request);
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== '') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          username: `${sessionStorage.getItem('username')}`,
          locale: navigator.language,
          session_token: `${sessionStorage.getItem('token')}`,
          timzone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });

      console.log('JwtInterceptor35', request);
    }
    return next.handle(request);
  }
}
