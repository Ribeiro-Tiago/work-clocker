import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface ClockOutArgs {
	clockIn: number;
	duration: number;
	lunchTime: number;
	format: string;
}

@Pipe({
	name: 'calcClockout'
})
export class CalcClockoutPipe implements PipeTransform {
	constructor(private time: TimeService) { }

	transform(value: string, { clockIn, duration, lunchTime, format }: ClockOutArgs): any {
		const d = new Date(clockIn);

		console.log(format);

		this.time.setFormat(format);

		return value.replace(`{{time}}`, this.time.addTime(d, lunchTime, duration));
	}
}
