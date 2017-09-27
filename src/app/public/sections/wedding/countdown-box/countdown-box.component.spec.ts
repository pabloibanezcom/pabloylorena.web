import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownBoxComponent } from './countdown-box.component';

describe('CountdownComponent', () => {
  let component: CountdownBoxComponent;
  let fixture: ComponentFixture<CountdownBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
