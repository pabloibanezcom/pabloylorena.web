import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpButtonComponent } from './rsvp-button.component';

describe('RsvpButtonComponent', () => {
  let component: RsvpButtonComponent;
  let fixture: ComponentFixture<RsvpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
