import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeEvaluationsComponent } from './committee-evaluations.component';

describe('CommitteeEvaluationsComponent', () => {
  let component: CommitteeEvaluationsComponent;
  let fixture: ComponentFixture<CommitteeEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitteeEvaluationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
