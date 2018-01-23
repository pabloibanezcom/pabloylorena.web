import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveTablePaginationComponent } from './responsive-table-pagination.component';

describe('ResponsiveTablePaginationComponent', () => {
  let component: ResponsiveTablePaginationComponent;
  let fixture: ComponentFixture<ResponsiveTablePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveTablePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
