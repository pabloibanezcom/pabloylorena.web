import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpanComponent } from './form-span.component';

describe('FormSpanComponent', () => {
  let component: FormSpanComponent;
  let fixture: ComponentFixture<FormSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
