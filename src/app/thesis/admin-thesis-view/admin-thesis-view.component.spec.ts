import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThesisViewComponent } from './admin-thesis-view.component';

describe('AdminThesisViewComponent', () => {
  let component: AdminThesisViewComponent;
  let fixture: ComponentFixture<AdminThesisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminThesisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThesisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
