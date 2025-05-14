import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAnimationComponent } from './grid-animation.component';

describe('GridAnimationComponent', () => {
  let component: GridAnimationComponent;
  let fixture: ComponentFixture<GridAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
