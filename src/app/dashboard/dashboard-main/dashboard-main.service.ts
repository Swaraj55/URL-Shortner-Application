import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardMainService {

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

  getDashboardData(payload: any) {
    const theUrl = this.url + '/read/browser-name-with-click';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  getDeviceData(payload: any) {
    const theUrl = this.url + '/read/device-name-with-click';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  getUrlData(params: any) {
    const theUrl = this.url + '/read/url-shortner/selectByDB';
    return this.sendRequest<any>('GET', theUrl, {}, params);
  }

  getLastSevenData(params: any) {
    const theUrl = this.url + '/read/seven_days_data';
    return this.sendRequest<any>('GET', theUrl, {}, params);
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.httpClient.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
