import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorThesisViewComponent } from './supervisor-thesis-view.component';

describe('SupervisorThesisViewComponent', () => {
  let component: SupervisorThesisViewComponent;
  let fixture: ComponentFixture<SupervisorThesisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorThesisViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorThesisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
