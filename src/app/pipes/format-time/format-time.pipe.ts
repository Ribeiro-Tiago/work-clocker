import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface FormatTimeOpts {
	replace: string;
	payload: number;
}

@Pipe({
	name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
	constructor(private time: TimeService) { }

	transform(value: string, { replace, payload }: FormatTimeOpts): any {
		return value.replace(`{{${replace}}}`, this.time.formatTime(new Date(payload)));
	}
}
