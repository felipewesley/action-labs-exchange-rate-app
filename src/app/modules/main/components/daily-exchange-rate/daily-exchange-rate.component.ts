import { I18nPluralPipe, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { VALID_CURRENCY_CODES } from "app/domain/constants/valid-currency-codes.constant";
import { DailyExchangeRateDataModel } from "app/domain/models/daily-exchange-rate.model";

import { MainDailyExchangeRateListComponent, MainDailyExchangeRateListModel } from "./components/list/list.component";

@Component({
	selector: 'app-main-daily-exchange-rate',
	templateUrl: './daily-exchange-rate.component.html',
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
			.map(d => {

				const symbol = VALID_CURRENCY_CODES
					.find(c => c.currencyCode == this.toSymbol)
					?.symbol;

				return <MainDailyExchangeRateListModel>{
					...d,
					closeDiff: 2.5174412,
					currencySymbol: symbol
				};
			});

		this.dailyExchangeRates = rates;
	};

	@Output('onLoadDailyExchangeRates') public onLoadDailyExchangeRates = new EventEmitter<void>();

	public dailyExchangeRates: MainDailyExchangeRateListModel[] = [];

	public opened: boolean;

	constructor() { }

	ngOnInit(): void {

		this.toggleDailyExchangeRates();
	}

	public toggleDailyExchangeRates(): void {

		if (!this.opened && this.dailyExchangeRates.length == 0) {
			this.onLoadDailyExchangeRates.emit();
		}

		this.opened = !this.opened;
	}
}
