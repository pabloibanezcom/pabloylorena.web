import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBoxComponent } from './hotel-box.component';

describe('HotelBoxComponent', () => {
  let component: HotelBoxComponent;
  let fixture: ComponentFixture<HotelBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
