import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGuestsComponent } from './table-guests.component';

describe('TableGuestsComponent', () => {
  let component: TableGuestsComponent;
  let fixture: ComponentFixture<TableGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
