import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  url: string;
  constructor(
    private _httpClient: HttpClient,
  ) { 
    let endPointOrigin = `${environment.basicURL}`;

    if(endPointOrigin === '') {
      endPointOrigin = location.origin;
    }

    this.url = endPointOrigin + '/api/v1'
  }

  signUpUser(data: any){
    let theURL = this.url + '/signup';
    return this.sendRequest<any>('POST', theURL, data, {});
  }

  private sendRequest<T>(requestType: string, url: string, body?: any, params?: any): Observable<T> {
    return this._httpClient.request<T>(requestType, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Error: ${error} (${error.statusText})`)));
  }
}
