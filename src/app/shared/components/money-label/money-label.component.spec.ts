import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyLabelComponent } from './money-label.component';

describe('MoneyLabelComponent', () => {
  let component: MoneyLabelComponent;
  let fixture: ComponentFixture<MoneyLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
