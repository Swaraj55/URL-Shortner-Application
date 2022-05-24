import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenTableService {

  constructor(
    private http: HttpClient
  ) { }

  getUrlShortenTableData() {
    return this.http.get('http://localhost:3000/urlShortenTable');
  }
}
