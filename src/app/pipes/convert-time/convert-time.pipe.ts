import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface ConvertTimeOpts {
	destType: "day" | "hours";
	payload: any;
	replace: string;
	format: string;
}

@Pipe({
	name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
	constructor(private timeHandle: TimeService) { }

	transform(value: string, { destType, payload, replace, format }: ConvertTimeOpts): any {
		let replaceText: string;

		this.timeHandle.setFormat(format);

		replaceText = (destType === "day")
			? this.timeHandle.formatDate(new Date(payload))
			: this.timeHandle.minutesToHours(payload);

		return value.replace(`{{${replace}}}`, replaceText);
	}
}
