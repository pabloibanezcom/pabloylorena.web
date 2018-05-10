import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModeComponent } from './delete-mode.component';

describe('DeleteModeComponent', () => {
  let component: DeleteModeComponent;
  let fixture: ComponentFixture<DeleteModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
