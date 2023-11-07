import { I18nPluralPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { VALID_CURRENCY_CODES } from "app/domain/constants/valid-currency-codes.constant";
import { DailyExchangeRateDataModel } from "app/domain/models/daily-exchange-rate.model";

import { MainDailyExchangeRateListComponent, MainDailyExchangeRateListModel } from "./components/list/list.component";

@Component({
	selector: 'app-main-daily-exchange-rate',
	templateUrl: './daily-exchange-rate.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NgIf,
		I18nPluralPipe,
		MatButtonModule,
		MatIconModule,

		MainDailyExchangeRateListComponent
	]
})
export class MainDailyExchangeRateComponent implements OnInit {

	@Input('numberOfDays') public numberOfDays: number;

	@Input('toSymbol') public toSymbol: string;

	@Input('fromSymbol') public set setFromSymbol(symbol: string) {
		this.opened = false;
	};

	@Input('dailyExchangeRates') public set setDailyExchangeRates(data: DailyExchangeRateDataModel[]) {

		if (!data) {
			this.dailyExchangeRates = [];
			return;
		}

		const rates: MainDailyExchangeRateListModel[] = data
			.map((d, i, arr) => {

				const symbol = VALID_CURRENCY_CODES
					.find(c => c.currencyCode == this.toSymbol)
					?.symbol;

				const closeOfYesterday = arr[i - 1]?.close ?? null;

				if (closeOfYesterday === null) {

					return <MainDailyExchangeRateListModel>{
						...d,
						closeDiff: 0,
						currencySymbol: symbol
					};
				}

				const { close } = d;

				const diff = close - closeOfYesterday;
				const closeDiff = (diff / closeOfYesterday) * 100;

				return <MainDailyExchangeRateListModel>{
					...d,
					closeDiff: closeDiff,
					currencySymbol: symbol
				};
			});

		this.dailyExchangeRates = rates;
	};

	@Input('loadingRates') public loadingRates: boolean;

	@Output('onLoadDailyExchangeRates') public onLoadDailyExchangeRates = new EventEmitter<void>();

	public dailyExchangeRates: MainDailyExchangeRateListModel[] = [];

	public opened: boolean;

	constructor() { }

	ngOnInit(): void {

	}

	public toggleDailyExchangeRates(): void {

		if (!this.opened && this.dailyExchangeRates.length == 0) {
			this.onLoadDailyExchangeRates.emit();
		}

		this.opened = !this.opened;
	}
}
