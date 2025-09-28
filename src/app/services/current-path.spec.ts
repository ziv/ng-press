import { TestBed } from '@angular/core/testing';

import { CurrentPath } from './current-path';

describe('CurrentUrl', () => {
  let service: CurrentPath;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPath);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
