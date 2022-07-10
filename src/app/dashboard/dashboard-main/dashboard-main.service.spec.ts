import { TestBed } from '@angular/core/testing';

import { DashboardMainService } from './dashboard-main.service';

describe('DashboardMainService', () => {
  let service: DashboardMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
