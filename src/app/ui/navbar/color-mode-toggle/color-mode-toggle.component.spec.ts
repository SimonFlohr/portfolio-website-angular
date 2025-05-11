import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModeToggleComponent } from './color-mode-toggle.component';

describe('ColorModeToggleComponent', () => {
  let component: ColorModeToggleComponent;
  let fixture: ComponentFixture<ColorModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorModeToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
