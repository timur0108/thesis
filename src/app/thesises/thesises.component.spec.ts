import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisesComponent } from './thesises.component';

describe('ThesisesComponent', () => {
  let component: ThesisesComponent;
  let fixture: ComponentFixture<ThesisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
