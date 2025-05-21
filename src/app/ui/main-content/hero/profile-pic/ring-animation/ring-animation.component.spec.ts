import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingAnimationComponent } from './ring-animation.component';

describe('RingAnimationComponent', () => {
  let component: RingAnimationComponent;
  let fixture: ComponentFixture<RingAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RingAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
