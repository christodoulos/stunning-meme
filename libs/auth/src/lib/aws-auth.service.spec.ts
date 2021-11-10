import { TestBed } from '@angular/core/testing';

import { AwsAuthService } from './aws-auth.service';

describe('AwsAuthService', () => {
  let service: AwsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
