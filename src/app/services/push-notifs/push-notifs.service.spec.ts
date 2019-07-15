import { TestBed } from '@angular/core/testing';

import { PushNotifsService } from './push-notifs.service';

describe('PushNotifsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushNotifsService = TestBed.get(PushNotifsService);
    expect(service).toBeTruthy();
  });
});
