import { CurrencyPipe, DatePipe, registerLocaleData } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import localePt from "@angular/common/locales/pt";

import { VALID_CURRENCY_CODES } from "app/domain/constants/valid-currency-codes.constant";

@Component({
	selector: 'app-main-current-exchange-rate',
	templateUrl: './current-exchange-rate.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		DatePipe,
		CurrencyPipe
	],
})
export class MainCurrentExchangeRateComponent implements OnInit {

	/**
	 * Last updated at
	 */
	@Input('lastUpdatedAt') public lastUpdatedAt: Date;

	/**
	 * From symbol
	 */
	@Input('fromSymbol') public fromSymbol: string;

	/**
	 * To Symbol
	 */
	@Input('toSymbol') public set setToSymbol(toSymbol: string) {

		this.toSymbol = toSymbol;

		const currencySymbol = VALID_CURRENCY_CODES
			.find(c => c.currencyCode == toSymbol)
			?.symbol;

		this.currencySymbol = currencySymbol;
	};

	/**
	 * Exchange rate
	 */
	@Input('exchangeRate') public exchangeRate: number;

	public toSymbol: string;
	public currencySymbol: string;

	constructor() { }

	ngOnInit(): void {

		registerLocaleData(localePt, 'pt-BR');
	}
}
