import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisOverviewComponent } from './thesis-overview.component';

describe('ThesisOverviewComponent', () => {
  let component: ThesisOverviewComponent;
  let fixture: ComponentFixture<ThesisOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
