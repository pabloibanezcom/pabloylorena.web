import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBaseComponent } from './public-base.component';

describe('PublicBaseComponent', () => {
  let component: PublicBaseComponent;
  let fixture: ComponentFixture<PublicBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
