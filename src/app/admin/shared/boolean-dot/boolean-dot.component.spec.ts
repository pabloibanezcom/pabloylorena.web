import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanDotComponent } from './boolean-dot.component';

describe('BooleanDotComponent', () => {
  let component: BooleanDotComponent;
  let fixture: ComponentFixture<BooleanDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
