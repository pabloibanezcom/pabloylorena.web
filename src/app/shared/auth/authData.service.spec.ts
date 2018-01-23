import { TestBed, inject } from '@angular/core/testing';

import { AuthDataService } from './authData.service';

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDataService]
    });
  });

  it('should be created', inject([AuthDataService], (service: AuthDataService) => {
    expect(service).toBeTruthy();
  }));
});
