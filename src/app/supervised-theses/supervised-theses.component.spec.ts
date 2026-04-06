import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisedThesesComponent } from './supervised-theses.component';

describe('SupervisedThesesComponent', () => {
  let component: SupervisedThesesComponent;
  let fixture: ComponentFixture<SupervisedThesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisedThesesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisedThesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
