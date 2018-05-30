import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypeLabelComponent } from './notification-type-label.component';

describe('NotificationTypeLabelComponent', () => {
  let component: NotificationTypeLabelComponent;
  let fixture: ComponentFixture<NotificationTypeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTypeLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTypeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
