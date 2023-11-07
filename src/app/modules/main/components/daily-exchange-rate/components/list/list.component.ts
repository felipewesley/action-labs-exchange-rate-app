import { CurrencyPipe, DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { DailyExchangeRateDataModel } from "app/domain/models/daily-exchange-rate.model";
import { CloseDiffFormatPipe, CloseDiffSignalPipe } from "app/shared/pipes/close-diff";
import { DailyExchangeRatePipe } from "app/shared/pipes/daily-exchange-rate";

export type MainDailyExchangeRateListModel = DailyExchangeRateDataModel & {
	closeDiff: number;
	currencySymbol: string;
};

@Component({
	selector: 'app-main-daily-exchange-rate-list',
	templateUrl: './list.component.html',
	standalone: true,
	imports: [
		NgIf,
		NgFor,
		DatePipe,
		NgClass,
		NgSwitch,
		NgSwitchCase,
		MatIconModule,
		DailyExchangeRatePipe,
		CloseDiffSignalPipe,
		CloseDiffFormatPipe
	],
	providers: [
		CurrencyPipe,
		DecimalPipe
	]
})
export class MainDailyExchangeRateListComponent implements OnInit {

	@Input('dailyExchangeRates') public dailyExchangeRates: MainDailyExchangeRateListModel[];

	@Input('loadingRates') public loadingRates: boolean;

	constructor() { }

	ngOnInit(): void {

	}
}
