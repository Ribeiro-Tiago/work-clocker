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

	transform(value: string, item: any[]): any {
		const d = new Date(item[0]);

		this.time.setFormat(item[1]);

		return value.replace(/{{.*?}}/g, this.time.addTime(d, item[2], item[3]));
	}
}
