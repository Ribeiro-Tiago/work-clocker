import { Pipe, PipeTransform } from "@angular/core";
import { TimeService } from "src/app/services/time/time.service";

interface ClockOutArgs {
	clockIn: number;
	workDuration: number;
	lunchTime: number;
	format: string;
}

@Pipe({
	name: "calcClockout"
})
export class CalcClockoutPipe implements PipeTransform {
	constructor(private time: TimeService) { }

	transform(value: string, { clockIn, workDuration, format, lunchTime }: ClockOutArgs): any {
		const d = new Date(clockIn);

		this.time.setFormat(format);

		return value.replace(/{{.*?}}/g, this.time.addTime(d, lunchTime, workDuration));
	}
}
