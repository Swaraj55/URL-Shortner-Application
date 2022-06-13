import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient
  ) { }

  saveUserProfileImage(payload: any) {
    let theUrl = 'http://localhost:3000/api/v1/insert/user-profile-image';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  getUserProfileImage(payload: any) {
    const theUrl = 'http://localhost:3000/api/v1/read/user-profile-image';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  deleteUserProfileImage(payload: any) {
    const theUrl = 'http://localhost:3000/api/v1/delete/user-profile-image/delete';
    return this.sendRequest<any>('DELETE', theUrl, payload, {});
  }

  readUserProfile(payload: any) {
    const theUrl = 'http://localhost:3000/api/v1/read/user-profile-info';
    return this.sendRequest<any>('GET', theUrl, {}, payload);
  }

  updateUserProfile(payload: any) {
    const theUrl = 'http://localhost:3000/api/v1/insert/user-profile-info';
    return this.sendRequest<any>('POST', theUrl, payload, {});
  }

  private sendRequest<T>(verb: string, url: string, body?: any, params?: any): Observable<T> {
    return this.http.request<T>(verb, url, {body: body , params : params})
        .pipe(catchError((error: Response) =>
            throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
}
