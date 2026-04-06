import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisCardComponent } from './thesis-card.component';


describe('ThesisCardComponent', () => {
  let component: ThesisCardComponent;
  let fixture: ComponentFixture<ThesisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
