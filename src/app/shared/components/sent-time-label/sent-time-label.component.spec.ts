import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentTimeLabelComponent } from './sent-time-label.component';

describe('SentTimeLabelComponent', () => {
  let component: SentTimeLabelComponent;
  let fixture: ComponentFixture<SentTimeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentTimeLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentTimeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
