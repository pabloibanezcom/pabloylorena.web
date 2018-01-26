import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliedLabelComponent } from './replied-label.component';

describe('RepliedLabelComponent', () => {
  let component: RepliedLabelComponent;
  let fixture: ComponentFixture<RepliedLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepliedLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepliedLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
