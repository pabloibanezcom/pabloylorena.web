import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestModalComponent } from './guest-modal.component';

describe('GuestModalComponent', () => {
  let component: GuestModalComponent;
  let fixture: ComponentFixture<GuestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
