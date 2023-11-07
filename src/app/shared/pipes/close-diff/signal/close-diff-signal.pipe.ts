import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'closeDiffSignal',
	pure: true,
	standalone: true,
})
export class CloseDiffSignalPipe implements PipeTransform {

	constructor() { }

	transform(value: number): string {

		console.log('signal =>', value);

		if (value == 0) {
			return value.toString();
		}

		const signal = value > 0 ? '+' : '-';

		return `${signal}${value}`;
	}
}
