import { CurrencyPipe, DatePipe, NgClass, NgFor } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { DailyExchangeRateDataModel } from "app/domain/models/daily-exchange-rate.model";

export type MainDailyExchangeRateListModel = DailyExchangeRateDataModel & {
	closeDiff: number;
};

@Component({
	selector: 'app-main-daily-exchange-rate-list',
	templateUrl: './list.component.html',
	standalone: true,
	imports: [
		NgFor,
		DatePipe,
		NgClass,
		CurrencyPipe
	]
})
export class MainDailyExchangeRateListComponent implements OnInit {

	@Input('dailyExchangeRates') public dailyExchangeRates: MainDailyExchangeRateListModel[];

	constructor() { }

	ngOnInit(): void {

	}
}
