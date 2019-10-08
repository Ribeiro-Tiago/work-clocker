import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwedExtraHoursComponent } from './owed-extra-hours.component';

describe('OwedExtraHoursComponent', () => {
  let component: OwedExtraHoursComponent;
  let fixture: ComponentFixture<OwedExtraHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwedExtraHoursComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwedExtraHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
