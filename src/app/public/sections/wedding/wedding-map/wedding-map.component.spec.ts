import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingMapComponent } from './wedding-map.component';

describe('WeddingMapComponent', () => {
  let component: WeddingMapComponent;
  let fixture: ComponentFixture<WeddingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
