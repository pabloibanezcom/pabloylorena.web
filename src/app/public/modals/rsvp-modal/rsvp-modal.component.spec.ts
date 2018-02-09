import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpModalComponent } from './rsvp-modal.component';

describe('RsvpModalComponent', () => {
  let component: RsvpModalComponent;
  let fixture: ComponentFixture<RsvpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
