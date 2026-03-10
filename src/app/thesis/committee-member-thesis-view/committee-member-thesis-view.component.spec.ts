import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMemberThesisViewComponent } from './committee-member-thesis-view.component';

describe('CommitteeMemberThesisViewComponent', () => {
  let component: CommitteeMemberThesisViewComponent;
  let fixture: ComponentFixture<CommitteeMemberThesisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitteeMemberThesisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteeMemberThesisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
