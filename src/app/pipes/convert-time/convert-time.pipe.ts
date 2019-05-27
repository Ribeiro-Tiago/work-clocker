import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface ConvertTimeOpts {
	destType: "day" | "hours";
	payload: any;
	replace: string;
	format?: string;
}

@Pipe({
	name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
	constructor(private timeHandle: TimeService) { }

	transform(value: string, { destType, payload, replace, format }: ConvertTimeOpts): any {
		let replaceText: string;


		if (destType === "day") {
			this.timeHandle.setFormat(format);
			replaceText = this.timeHandle.formatDate(new Date(payload));
		} else {
			replaceText = this.timeHandle.minutesToHours(payload);
		}

		return value.replace(`{{${replace}}}`, replaceText);
	}
}
