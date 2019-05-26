import { Pipe, PipeTransform } from '@angular/core';

interface ConvertTimeOpts {
	destType: "day" | "hours";
	payload: any;
	replace: string;
}

@Pipe({
	name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
	transform(value: string, args?: ConvertTimeOpts): any {
		let replaceText: string;

		if (args.destType === "day") {
			const d = new Date(args.payload);
			replaceText = `${this.addLeadZero(d.getDate())}/${this.addLeadZero(d.getMonth() + 1)}/${d.getFullYear()}`;
		} else {
			const hours = Math.floor(args.payload / 60);
			const minutes = args.payload % 60;
			replaceText = (hours > 0)
				? `${hours}h${minutes}m`
				: `${minutes}m`;
		}

		return value.replace(`{{${args.replace}}}`, replaceText);
	}

	private addLeadZero(num: number): string {
		return `0${num}`.substr(-2);
	}
}
