import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TableGuestModalComponent } from './table-guest-modal.component';


describe('TableGuestModalComponent', () => {
  let component: TableGuestModalComponent;
  let fixture: ComponentFixture<TableGuestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableGuestModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGuestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
