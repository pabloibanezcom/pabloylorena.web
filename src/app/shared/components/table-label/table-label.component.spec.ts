import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLabelComponent } from './table-label.component';

describe('TableLabelComponent', () => {
  let component: TableLabelComponent;
  let fixture: ComponentFixture<TableLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
