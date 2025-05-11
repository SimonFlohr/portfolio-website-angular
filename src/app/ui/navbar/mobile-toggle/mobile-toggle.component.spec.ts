import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileToggleComponent } from './mobile-toggle.component';

describe('MobileToggleComponent', () => {
  let component: MobileToggleComponent;
  let fixture: ComponentFixture<MobileToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
