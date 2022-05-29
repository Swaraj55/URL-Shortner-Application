import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenTableService {

  constructor(
    private http: HttpClient
  ) { }

  createUrlShorten(payload: any) {
    const theUrl = 'http://localhost:3000/api/v1/create/url-shortner/insert';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  getUrlShortenTableData(params: any) {
    console.log(params);
    const theUrl = 'http://localhost:3000/api/v1/read/url-shortner/selectByDB';
    return this.sendRequest<any>('GET', theUrl, {}, params);
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.http.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
