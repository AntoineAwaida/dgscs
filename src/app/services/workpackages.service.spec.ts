import { TestBed } from '@angular/core/testing';

import { WorkpackagesService } from './workpackages.service';

describe('WorkpackagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkpackagesService = TestBed.get(WorkpackagesService);
    expect(service).toBeTruthy();
  });
});
