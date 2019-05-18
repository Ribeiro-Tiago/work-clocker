import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'convertToHours'
})
export class ConvertToHoursPipe implements PipeTransform {
	transform(value: string, args?: any): string {
		const totalMinutes = args.hoursWorked;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		const replaceVal = (hours > 0)
			? `${hours}h${minutes}m`
			: `${minutes}m`

		return value.replace("{{time}}", replaceVal);
	};
}
