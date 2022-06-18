import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenTableService {

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

  createUrlShorten(payload: any) {
    const theUrl = this.url + '/create/url-shortner/insert';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  getUrlShortenTableData(params: any) {
    // console.log(params);
    const theUrl = this.url + '/read/url-shortner/selectByDB';
    return this.sendRequest<any>('GET', theUrl, {}, params);
  }

  deleteUrlShorten(payload: any) {
    // console.log(payload)
    const theUrl = this.url + '/delete/url-shortner/delete';
    return this.sendRequest<any>('DELETE', theUrl, payload, {});
  }

  updateUrlShorten(payload: any) {
    const theUrl = this.url + '/update/url-shortner/update';
    return this.sendRequest<any>('PATCH', theUrl, payload, {});
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.http.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
