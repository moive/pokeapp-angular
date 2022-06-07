import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokeList } from '../poke/interfaces/pokeList.interface';
import { pokeListMock } from '../__mocks__/pockeList.mock';
import { pokeDataMock } from '../__mocks__/pokeData.mock';

import { PokeService } from './poke.service';

describe('PokeService', () => {
  let service: PokeService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeService],
    });
    httpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokeService);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http request', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';

    service.getList().subscribe(() => {
      done();
    });

    const req: TestRequest = httpClient.expectOne(url);

    expect(req.request.url).toEqual(service.url);
    expect(req.request.urlWithParams).toEqual(url);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should return a list of pokemons', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10';

    service.getList().subscribe((data) => {
      expect(data).toEqual(pokeListMock);
      expect(data.results.length).toBe(8);

      done();
    });

    httpClient.expectOne(url).flush(pokeListMock);
  });

  it('should return the picture url', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1';

    service.getPokeData('1').subscribe((data) => {
      expect(data).toEqual(pokeDataMock);

      done();
    });

    httpClient.expectOne(url).flush(pokeDataMock);
  });
});
