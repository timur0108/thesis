import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThesisDialogComponent } from './add-thesis-dialog.component';

describe('AddThesisDialogComponent', () => {
  let component: AddThesisDialogComponent;
  let fixture: ComponentFixture<AddThesisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddThesisDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddThesisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
