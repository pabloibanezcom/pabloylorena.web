import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGuestComponent } from './form-guest.component';

describe('FormGuestComponent', () => {
  let component: FormGuestComponent;
  let fixture: ComponentFixture<FormGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
