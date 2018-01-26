import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentLabelComponent } from './sent-label.component';

describe('SentLabelComponent', () => {
  let component: SentLabelComponent;
  let fixture: ComponentFixture<SentLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
