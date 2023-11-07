import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'dailyExchangeRate',
	pure: true,
	standalone: true,
})
export class DailyExchangeRatePipe implements PipeTransform {

	private readonly _numberOfDecimals = 4;

	constructor(
		private _currencyPipe: CurrencyPipe
	) { }

	transform(value: number, symbol: string): string {

		/**
		 * Sets the number of decimals
		 */
		const formated = this._currencyPipe.transform(value, symbol, 'symbol', `1.${this._numberOfDecimals}`);

		const firstDigit = /\d/.exec(formated);

		/**
		 * Including a space between the symbol and the value
		 */
		const formatedAndSpaced = formated.replace(/\d/, ` ${firstDigit[0]}`);

		return formatedAndSpaced;
	}

}
