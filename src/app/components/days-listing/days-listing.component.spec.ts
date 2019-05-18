import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysListingComponent } from './days-listing.component';

describe('DaysListingComponent', () => {
	let component: DaysListingComponent;
	let fixture: ComponentFixture<DaysListingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DaysListingComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DaysListingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
