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

	transform(value: string, payload: any /* { destType, payload, format }: ConvertTimeOpts */): any {
		let replaceText: string;

		if (payload[0] === "day") {
			this.timeHandle.setFormat(payload[2]);
			replaceText = this.timeHandle.formatDate(new Date(payload[1]));
		} else if (payload[0] === "hours") {
			replaceText = this.timeHandle.minutesToHours(payload[1]);
		} else {
			const d = new Date(payload[1]);

			replaceText = this.timeHandle.minutesToHours(d.getHours() * 60 + d.getMinutes());
		}

		return value.replace(/{{.*?}}/g, replaceText);
	}
}
