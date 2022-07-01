import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrGeneratorService {

  url: string;
  constructor(
    private http: HttpClient
  ) {
    let endPointOrigin = `${environment.basicURL}`;

    if(endPointOrigin === '') {
      endPointOrigin = location.origin;
    }

    this.url = endPointOrigin + '/api/v1';
   }


  getQrCodes(params: any) {
    // console.log(params);
    const theUrl = this.url + '/read/url-shortner/selectByDB';
    return this.sendRequest<any>('GET', theUrl, {}, params);
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.http.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
