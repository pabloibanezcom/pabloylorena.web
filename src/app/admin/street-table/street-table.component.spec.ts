import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetTableComponent } from './street-table.component';

describe('StreetTableComponent', () => {
  let component: StreetTableComponent;
  let fixture: ComponentFixture<StreetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
