import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'closeDiffSignal',
	pure: true,
	standalone: true,
})
export class CloseDiffSignalPipe implements PipeTransform {

	constructor() { }

	transform(value: number): string {

		if (value == 0) {
			return value.toString();
		}

		if (value > 0) {
			return `+${value}`;
		}

		// Already have a negative signal
		return value.toString();
	}
}
