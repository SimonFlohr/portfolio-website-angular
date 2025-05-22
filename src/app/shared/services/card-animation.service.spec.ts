import { TestBed } from '@angular/core/testing';

import { CardAnimationService } from './card-animation.service';

describe('CardAnimationService', () => {
  let service: CardAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
