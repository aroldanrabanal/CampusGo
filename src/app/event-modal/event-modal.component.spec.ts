import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventModalComponent } from './event-modal.component';

describe('EventModalComponent', () => {
  let component: EventModalComponent;
  let fixture: ComponentFixture<EventModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EventModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
