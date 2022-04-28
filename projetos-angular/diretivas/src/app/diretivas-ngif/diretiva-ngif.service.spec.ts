import { TestBed } from '@angular/core/testing';

import { DiretivaNgifService } from './diretiva-ngif.service';

describe('DiretivaNgifService', () => {
  let service: DiretivaNgifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiretivaNgifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
