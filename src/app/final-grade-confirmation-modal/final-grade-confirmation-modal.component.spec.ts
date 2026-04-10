import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalGradeConfirmationModalComponent } from './final-grade-confirmation-modal.component';

describe('FinalGradeConfirmationModalComponent', () => {
  let component: FinalGradeConfirmationModalComponent;
  let fixture: ComponentFixture<FinalGradeConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalGradeConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalGradeConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
