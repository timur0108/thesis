import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThesisToSessionModalComponent } from './add-thesis-to-session-modal.component';

describe('AddThesisToSessionModalComponent', () => {
  let component: AddThesisToSessionModalComponent;
  let fixture: ComponentFixture<AddThesisToSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddThesisToSessionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddThesisToSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
