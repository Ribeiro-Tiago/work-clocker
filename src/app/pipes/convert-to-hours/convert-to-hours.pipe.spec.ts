import { ConvertToHoursPipe } from './convert-to-hours.pipe';

describe('CalcHoursPipe', () => {
	it('create an instance', () => {
		const pipe = new ConvertToHoursPipe();
		expect(pipe).toBeTruthy();
	});
});
