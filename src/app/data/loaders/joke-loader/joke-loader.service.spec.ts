import { TestBed } from '@angular/core/testing';

import { JokeLoaderService } from './joke-loader.service';

describe('JokeLoaderService', () => {
  let service: JokeLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
