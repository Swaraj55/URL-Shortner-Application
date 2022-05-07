// Generate this file with: ng g interceptor jwt

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@url-shortner/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          username: currentUser.username,
          locale: navigator.language,
          session_token: currentUser.token,
          timzone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });
    }
    return next.handle(request);
  }
}
