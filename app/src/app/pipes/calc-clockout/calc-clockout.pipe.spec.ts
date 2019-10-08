import { CalcClockoutPipe } from "./calc-clockout.pipe";

import { TimeService } from "src/app/services/time/time.service";

describe("CalcClockoutPipe", () => {
	it("create an instance", () => {
		const pipe = new CalcClockoutPipe(new TimeService());
		expect(pipe).toBeTruthy();
	});
});
