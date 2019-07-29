import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time/time.service';

interface ConvertTimeOpts {
	destType: "day" | "hours" | "timestamp";
	payload: any;
	format?: string;
}

interface PayloadOption {
	key: string;
	value: string;
}

@Pipe({
	name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {
	constructor(private timeHandle: TimeService) { }

	transform(originText: string, { destType, payload, format }: ConvertTimeOpts): any {
		let replaceText: string | PayloadOption[];
		const multipleFields = (typeof payload === "object");

		if (multipleFields) {
			if (destType === "day") {
				this.timeHandle.setFormat(format);

				replaceText = Object.entries(payload).map(entry => ({
					key: entry[0],
					value: this.timeHandle.formatDate(new Date(entry[1] as number))
				}));

			} else if (destType === "hours") {
				replaceText = Object.entries(payload).map(entry => ({
					key: entry[0],
					value: this.timeHandle.minutesToHours(entry[1] as number)
				}));
			} else {
				let d: Date;

				replaceText = Object.entries(payload).map(entry => {
					d = new Date(entry[1] as number);

					return {
						key: entry[0],
						value: this.timeHandle.minutesToHours(d.getHours() * 60 + d.getMinutes())
					};
				});
			}
		} else {
			if (destType === "day") {
				this.timeHandle.setFormat(format);
				replaceText = this.timeHandle.formatDate(new Date(payload));
			} else if (destType === "hours") {
				replaceText = this.timeHandle.minutesToHours(payload);
			} else {
				const d = new Date(payload);

				replaceText = this.timeHandle.minutesToHours(d.getHours() * 60 + d.getMinutes());
			}
		}

		if (multipleFields) {
			let text = originText;

			console.log(text);
			(replaceText as PayloadOption[])
				.forEach(({ key, value }) => {
					console.log(key, value);
					text = text.replace(`{{ ${key} }}`, value);
				});

			return text;
		}

		return originText.replace(/{{.*?}}/g, replaceText as string);
	}
}
