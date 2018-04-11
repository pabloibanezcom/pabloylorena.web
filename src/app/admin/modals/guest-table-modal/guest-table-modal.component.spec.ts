import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTableModalComponent } from './guest-table-modal.component';

describe('GuestTableModalComponent', () => {
  let component: GuestTableModalComponent;
  let fixture: ComponentFixture<GuestTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
