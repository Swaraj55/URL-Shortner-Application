import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url: string;
  constructor(
    private httpClient: HttpClient
  ) {
    let endPointOrigin = `${environment.basicURL}`;

    if(endPointOrigin === '') {
      endPointOrigin = location.origin;
    }

    this.url = endPointOrigin + '/api/v1';
   }

   updatePasswordChange(payload: any) {
    const theUrl = this.url + '/update/reset-password';
    return this.sendRequest<any>('POST', theUrl, payload, {});
   }

   private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.httpClient.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
