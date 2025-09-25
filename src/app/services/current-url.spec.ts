import { TestBed } from '@angular/core/testing';

import { CurrentUrl } from './current-url';

describe('CurrentUrl', () => {
  let service: CurrentUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUrl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
