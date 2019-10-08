import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeedbackModalComponent } from "./feedback-modal.component";

describe("FeedbackModalComponent", () => {
	let component: FeedbackModalComponent;
	let fixture: ComponentFixture<FeedbackModalComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FeedbackModalComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedbackModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
