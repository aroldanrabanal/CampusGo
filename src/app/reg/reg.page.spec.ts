import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegPage } from './reg.page';

describe('RegPage', () => {
  let component: RegPage;
  let fixture: ComponentFixture<RegPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
