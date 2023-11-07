import { I18nPluralPipe, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

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

				return <MainDailyExchangeRateListModel>{
					...d,
					closeDiff: 2.5
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
