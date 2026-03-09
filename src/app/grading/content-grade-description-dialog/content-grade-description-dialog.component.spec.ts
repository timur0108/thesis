import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGradeDescriptionDialogComponent } from './content-grade-description-dialog.component';

describe('ContentGradeDescriptionDialogComponent', () => {
  let component: ContentGradeDescriptionDialogComponent;
  let fixture: ComponentFixture<ContentGradeDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentGradeDescriptionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentGradeDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
