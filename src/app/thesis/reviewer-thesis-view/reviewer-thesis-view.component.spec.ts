import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerThesisViewComponent } from './reviewer-thesis-view.component';

describe('ReviewerThesisViewComponent', () => {
  let component: ReviewerThesisViewComponent;
  let fixture: ComponentFixture<ReviewerThesisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewerThesisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerThesisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
