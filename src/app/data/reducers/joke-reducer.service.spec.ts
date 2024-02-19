import { TestBed } from '@angular/core/testing';

import { JokeReducerService } from './joke-reducer.service';

describe('JokeReducerService', () => {
  let service: JokeReducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeReducerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
