import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockedHoursPage } from './clocked-hours.page';

describe('ClockedHoursPage', () => {
  let component: ClockedHoursPage;
  let fixture: ComponentFixture<ClockedHoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockedHoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockedHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
