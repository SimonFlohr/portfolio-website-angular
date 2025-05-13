import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeButtonComponent } from './resume-button.component';

describe('ResumeButtonComponent', () => {
  let component: ResumeButtonComponent;
  let fixture: ComponentFixture<ResumeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
