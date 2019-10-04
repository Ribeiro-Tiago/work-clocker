import { ConvertTimePipe } from "./convert-time.pipe";
import { TimeService } from "src/app/services/time/time.service";

describe("ConvertTimePipe", () => {
	it("create an instance", () => {
		const pipe = new ConvertTimePipe(new TimeService());
		expect(pipe).toBeTruthy();
	});
});
