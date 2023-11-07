import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'closeDiffFormat',
	pure: true,
	standalone: true,
})
export class CloseDiffFormatPipe implements PipeTransform {

	private readonly _decimalMinDigits = 1;
	private readonly _decimalMaxDigits = 2;

	constructor(
		private _decimalPipe: DecimalPipe
	) { }

	transform(value: number): number {

		const formated = this._decimalPipe.transform(value, `1.${this._decimalMinDigits}-${this._decimalMaxDigits}`);

		return +formated;
	}
}
