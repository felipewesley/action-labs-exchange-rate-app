import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-main-current-exchange-rate',
	templateUrl: './current-exchange-rate.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		DatePipe
	]
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
	@Input('toSymbol') public toSymbol: string;

	/**
	 * Exchange rate
	 */
	@Input('exchangeRate') public exchangeRate: number;

	constructor() { }

	ngOnInit(): void {

	}
}
