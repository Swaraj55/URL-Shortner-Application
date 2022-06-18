import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

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

  saveUserProfileImage(payload: any) {
    let theUrl = this.url + '/insert/user-profile-image';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  getUserProfileImage(payload: any) {
    const theUrl = this.url + '/read/user-profile-image';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  deleteUserProfileImage(payload: any) {
    const theUrl = this.url + '/delete/user-profile-image/delete';
    return this.sendRequest<any>('DELETE', theUrl, payload, {});
  }

  readUserProfile(payload: any) {
    const theUrl = this.url + '/read/user-profile-info';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  updateUserProfile(payload: any) {
    const theUrl = this.url + '/insert/user-profile-info';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.http.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
