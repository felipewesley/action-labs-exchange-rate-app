import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { Subject, filter, map, switchMap, takeUntil } from "rxjs";

import { VALID_CURRENCY_CODES } from "app/domain/constants/valid-currency-codes.constant";

import { MainService } from "./services/main.service";

import { MainCurrentExchangeRateComponent } from "./components/current-exchange-rate/current-exchange-rate.component";

const currencyCodeQueryParamsKey = 'currencyCode';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,

		MainCurrentExchangeRateComponent
	],
	providers: [
		MainService
	]
})
export class MainComponent implements OnInit, OnDestroy {

	public readonly currencyCodeControl: FormControl<string>;

	private readonly _unsubscribeAll = new Subject<void>();

	constructor(
		private _service: MainService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {

		const minAndMaxLength = VALID_CURRENCY_CODES
			.map(c => c.key)
			.reduce((minAndMax, code) => {

				if (code.length > minAndMax.max) {
					minAndMax.max = code.length;
				}

				if (code.length < minAndMax.min) {
					minAndMax.min = code.length;
				}

				return minAndMax;
			}, { min: 0, max: 0 });

		this.currencyCodeControl = new FormControl<string>(null, [
			Validators.minLength(minAndMaxLength.min),
			Validators.maxLength(minAndMaxLength.max)
		]);
	}

	ngOnInit(): void {

		this._activatedRoute.queryParamMap
			.pipe(
				map(params => {

					const currencyCode = params.get(currencyCodeQueryParamsKey);

					// No currency code in the query
					if (currencyCode == null) {
						this._service.clearCurrentExchangeRate();

						return null;
					}

					const isCurrencyCodeValid = VALID_CURRENCY_CODES
						.some(c => c.key == currencyCode);

					// Unknown or invalid currency code
					if (!isCurrencyCodeValid) {

						console.error('Código desconhecido!');

						// Remove the currency code from the query
						this._updateCurrencyCodeQueryParam(null);

						return null;
					}

					// Currency code is in the query and the control value is empty
					if (this.currencyCodeControl.value != currencyCode) {
						this.currencyCodeControl.patchValue(currencyCode);
					}

					return currencyCode;
				}),
				filter(currencyCode => currencyCode != null),
				switchMap(currencyCode => {
					// Fetches api when its a valid currency code
					return this._service.fetchCurrentExchangeRate('BRL', currencyCode);
				}),
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

		this._updateCurrencyCodeQueryParam(fromSymbol);
	}

	public fetchDailyResults(): void {

		const fromSymbol = this.currencyCodeControl.value;
		const toSymbol = 'BRL';

		// Validations

		this._service.fetchDailyExchangeRate(fromSymbol, toSymbol)
			.subscribe();
	}

	private _updateCurrencyCodeQueryParam(currencyCode: string): void {

		this._router.navigate(['.'], {
			queryParams: {
				[currencyCodeQueryParamsKey]: currencyCode
			}
		});
	}
}
