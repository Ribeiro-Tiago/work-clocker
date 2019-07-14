import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

@Pipe({
	name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
	constructor(private time: TimeService) { }

	transform(value: string, payload: number): any {
		return value.replace(/{{.*?}}/g, this.time.formatTime(new Date(payload)));
	}
}
