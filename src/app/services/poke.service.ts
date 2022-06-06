import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private baseUrl: string = 'https://pokeapi.co/api/v2';

  pageOffset: number = 0;
  pageLimit: number = 10;

  constructor(private http: HttpClient) {}

  get url() {
    return this.baseUrl + '/pokemon/';
  }

  getList(page: number = this.pageOffset, limit: number = this.pageLimit) {
    return this.http.get(this.url, {
      params: {
        offset: page,
        limit,
      },
    });
  }

  getPokeData(name: string) {
    return this.http.get(`${this.url}${name}`);
  }
}
