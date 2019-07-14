import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface ConvertTimeOpts {
	destType: "day" | "hours" | "timestamp";
	payload: any;
	format?: string;
}

@Pipe({
	name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
	constructor(private timeHandle: TimeService) { }

	transform(value: string, { destType, payload, format }: ConvertTimeOpts): any {
		let replaceText: string;

		if (destType === "day") {
			this.timeHandle.setFormat(format);
			replaceText = this.timeHandle.formatDate(new Date(payload));
		} else if (destType === "hours") {
			replaceText = this.timeHandle.minutesToHours(payload);
		} else {
			const d = new Date(payload);

			replaceText = this.timeHandle.minutesToHours(d.getHours() * 60 + d.getMinutes());
		}

		return value.replace(/{{.*?}}/g, replaceText);
	}
}
