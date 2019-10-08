import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentHoursPage } from './spent-hours.page';

describe('SpentHoursPage', () => {
  let component: SpentHoursPage;
  let fixture: ComponentFixture<SpentHoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpentHoursPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpentHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
