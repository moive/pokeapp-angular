import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokeData } from '../poke/interfaces/pokeData.interface';
import { PokeList } from '../poke/interfaces/pokeList.interface';

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
    return this.http.get<PokeList>(this.url, {
      params: {
        offset: page,
        limit,
      },
    });
  }

  getPokeData(name: string) {
    return this.http.get<PokeData>(`${this.url}${name}`);
  }
}
