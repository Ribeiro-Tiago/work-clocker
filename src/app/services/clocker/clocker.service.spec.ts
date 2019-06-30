import { TestBed } from '@angular/core/testing';

import { ClockerService } from './clocker.service';

describe('ClockerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClockerService = TestBed.get(ClockerService);
    expect(service).toBeTruthy();
  });
});
