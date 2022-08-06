import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err: any) => {
            if (err.status === 401) {
                this.authenticationService.currentUserSubject.next(null)
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('currentUser');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('id');
                console.log(location.origin)
                window.location.href = location.origin + '/#/login'
            }

            return throwError('');
        }));
    }
}