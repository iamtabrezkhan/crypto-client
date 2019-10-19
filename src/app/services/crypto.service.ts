import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private http: HttpClient
  ) { }

  getLatestListings(start=1, limit=100) {
    let payload = {
      start,
      limit
    }
    return this.http.post(environment.urls.listingsLatest, payload);
  }

}
