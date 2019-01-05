import { TestBed } from '@angular/core/testing';

import { AnnouncesService } from './announces.service';

describe('AnnouncesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncesService = TestBed.get(AnnouncesService);
    expect(service).toBeTruthy();
  });
});
