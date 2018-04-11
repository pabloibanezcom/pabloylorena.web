import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGuestsLabelComponent } from './table-guests-label.component';

describe('TableGuestsLabelComponent', () => {
  let component: TableGuestsLabelComponent;
  let fixture: ComponentFixture<TableGuestsLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGuestsLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGuestsLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
