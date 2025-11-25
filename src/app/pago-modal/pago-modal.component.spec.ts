import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagoModalComponent } from './pago-modal.component';

describe('PagoModalComponent', () => {
  let component: PagoModalComponent;
  let fixture: ComponentFixture<PagoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PagoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
