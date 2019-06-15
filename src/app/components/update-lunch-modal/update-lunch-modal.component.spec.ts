import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLunchModalComponent } from './update-lunch-modal.component';

describe('UpdateLunchModalComponent', () => {
  let component: UpdateLunchModalComponent;
  let fixture: ComponentFixture<UpdateLunchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLunchModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLunchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
