import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePlannerComponent } from './table-planner.component';

describe('TablePlannerComponent', () => {
  let component: TablePlannerComponent;
  let fixture: ComponentFixture<TablePlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
