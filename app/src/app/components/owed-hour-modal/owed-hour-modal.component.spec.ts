import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwedHourModalComponent } from './owed-hour-modal.component';

describe('OwedHourModalComponent', () => {
  let component: OwedHourModalComponent;
  let fixture: ComponentFixture<OwedHourModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwedHourModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwedHourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
