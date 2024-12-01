import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService,StorageTranscoders,StringStorageTranscoder } from 'ngx-webstorage-service';
// import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
const CURRENT_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticatedUser: any;
  apiUrl: string;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private readonly REMEMBER_ME_KEY = 'rememberMe';
  private readonly USERNAME_KEY = 'username';

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(storage.get(CURRENT_USER_KEY, StorageTranscoders.JSON));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  } 

  login(username: string, password: string, totp: string, remember_me: boolean) {

    // console.log("Username..", username, "Password...", password, "TOTP...", totp)
    let endPointOrigin = `${environment.basicURL}`;

    if(endPointOrigin === '') {
      endPointOrigin = location.origin;
    }
    let theURL = endPointOrigin + '/api/v1'
    this.apiUrl = theURL + '/auth';

    //this.logger.debug(this.apiUrl);

    return this._httpClient.post(this.apiUrl, { username, password, totp }, { observe: 'response' }).pipe(map((authResponse: any) => {
      const userInfo = authResponse.body;
      // console.log(userInfo);
      if(userInfo.status === 'success'){
        //this.logger.debug('User logged in successfully');
        this.authenticatedUser = {
          username: userInfo.user.username,
          token: userInfo.token,
          email: userInfo.user.email,
          id: userInfo.user._id,
          accountCreation: userInfo.user.account_creation,
        }

        this.storage.set(CURRENT_USER_KEY, this.authenticatedUser, StorageTranscoders.JSON);
        sessionStorage.setItem('username', this.authenticatedUser.username);
        sessionStorage.setItem('token', this.authenticatedUser.token);
        sessionStorage.setItem('email', this.authenticatedUser.email);
        sessionStorage.setItem('id', this.authenticatedUser.id);
        console.log(remember_me)
        if (remember_me) {
          this.cookieService.set(this.REMEMBER_ME_KEY, 'true', { secure: true, sameSite: 'Strict' });
          this.cookieService.set(this.USERNAME_KEY, btoa(username + '+' + password), { secure: true, sameSite: 'Strict' });
        } else {
          this.cookieService.delete(this.REMEMBER_ME_KEY);
          this.cookieService.delete(this.USERNAME_KEY);
        }
        this.currentUserSubject.next(this.authenticatedUser);
      }

      return authResponse;
    }))
  }

  public isAuthenticatedUser(): boolean {
    if(this.currentUserValue){
      return true;
    } else {
      return false;
    }
  }

  isRemembered(): boolean {
    return this.cookieService.get(this.REMEMBER_ME_KEY) === 'true';
  }

  signUpUser(data: any) {
    let theURL = 'this.url' + '/signup';
    return  this._httpClient.post(theURL, data)
  }
}
