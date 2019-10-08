import { FormatTimePipe } from "./format-time.pipe";
import { TimeService } from "src/app/services/time/time.service";

describe("FormatTimePipe", () => {
	it("create an instance", () => {
		const pipe = new FormatTimePipe(new TimeService());
		expect(pipe).toBeTruthy();
  	});
});
