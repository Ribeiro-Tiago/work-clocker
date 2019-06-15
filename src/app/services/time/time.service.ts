import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TimeService {
	private format: string;

	setFormat(format: string): void {
		this.format = format;
	}

	minutesToHours(minutesToConvert: number): string {
		const hours = Math.floor(minutesToConvert / 60);
		const minutes = minutesToConvert % 60;

		if (hours === 0 && minutes === 0) {
			return "0";
		}

		return (hours > 0)
			? `${this.addLeadZero(hours)}:${this.addLeadZero(minutes)}`
			: `00:${this.addLeadZero(minutes)}`;
	}

	formatDate(d: Date): string {
		let result = this.format;

		result = result.replace("dd", this.addLeadZero(d.getDate()));
		result = result.replace("mm", this.addLeadZero(d.getMonth() + 1));
		result = result.replace("yyyy", `${d.getFullYear()}`);

		return result;
	}

	formatTime(d: Date): string {
		return `${this.addLeadZero(d.getHours())}:${this.addLeadZero(d.getMinutes())}`;
	}

	addTime(d: Date, minutes: number, hours?: number): string {
		if (hours) {
			d.setHours(d.getHours() + hours);
		}

		d.setMinutes(d.getMinutes() + minutes);

		return this.formatTime(d);
	}

	private addLeadZero(num: number): string {
		return `0${num}`.substr(-2);
	}
}
