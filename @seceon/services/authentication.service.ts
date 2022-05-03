import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService,StringStorageTranscoder } from 'ngx-webstorage-service';
import { NGXLogger } from 'ngx-logger';

const CURRENT_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
}
