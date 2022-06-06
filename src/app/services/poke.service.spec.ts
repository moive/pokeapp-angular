import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { pokeListMock } from '../__mocks__/pockeList.mock';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http request', (done: DoneFn) => {
    service.getList().subscribe((data) => {
      console.log(data);

      expect(1).toBe(1);

      done();
    });

    const req: TestRequest = httpClient.expectOne(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10'
    );

    expect(req.request.url).toEqual(service.url);

    req.flush(pokeListMock);

    httpClient.verify();
  });
});
