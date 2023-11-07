import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject, filter, map, switchMap, takeUntil, tap } from "rxjs";

import { MainService } from "./services/main.service";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	standalone: true,
	providers: [
		MainService
	]
})
export class MainComponent implements OnInit, OnDestroy {

	public readonly currencyCodeControl = new FormControl<string>(null);

	private readonly _unsubscribeAll = new Subject<void>();

	constructor(
		private _service: MainService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {

		this._activatedRoute.queryParamMap
			.pipe(
				map(params => params.get('symbol')),
				tap(symbol => {
					if (symbol == null) {
						this._service.clearCurrentExchangeRate();
					}
				}),
				filter(symbol => symbol != null),
				switchMap(symbol => this._service.fetchCurrentExchangeRate('BRL', symbol)),
				takeUntil(this._unsubscribeAll)
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	public fetchResult(): void {

		const fromSymbol = this.currencyCodeControl.value;

		// Validations

		this._router.navigate(['.'], {
			queryParams: {
				symbol: fromSymbol
			}
		});
	}

	public fetchDailyResults(): void {

		const fromSymbol = this.currencyCodeControl.value;
		const toSymbol = 'BRL';

		// Validations

		this._service.fetchDailyExchangeRate(fromSymbol, toSymbol)
			.subscribe();
	}
}
