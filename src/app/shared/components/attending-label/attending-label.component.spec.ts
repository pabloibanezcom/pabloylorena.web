import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendingLabelComponent } from './attending-label.component';

describe('AttendingLabelComponent', () => {
  let component: AttendingLabelComponent;
  let fixture: ComponentFixture<AttendingLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendingLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendingLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
