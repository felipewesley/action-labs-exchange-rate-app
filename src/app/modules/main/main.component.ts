import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { Subject, catchError, filter, map, switchMap, takeUntil, tap } from "rxjs";

import { NotificationService } from "app/core/services/notification";
import { VALID_CURRENCY_CODES } from "app/domain/constants/valid-currency-codes.constant";

import { MainService } from "./services/main.service";

import { MainCurrentExchangeRateComponent } from "./components/current-exchange-rate/current-exchange-rate.component";
import { MainDailyExchangeRateComponent } from "./components/daily-exchange-rate/daily-exchange-rate.component";

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
		MatProgressBarModule,

		MainCurrentExchangeRateComponent,
		MainDailyExchangeRateComponent
	],
	providers: [
		MainService
	]
})
export class MainComponent implements OnInit, OnDestroy {

	public readonly currencyCodeControl: FormControl<string>;

	public readonly currentExchangeRate$ = this._service.currentExchangeRate$;
	public readonly dailyExchangeRate$ = this._service.dailyExchangeRate$;

	public readonly loading$ = this._service.loading$
		.pipe(
			tap(loading => {
				if (loading) {
					this.currencyCodeControl.disable();
				} else {
					this.currencyCodeControl.enable();
				}
			})
		);

	private readonly _unsubscribeAll = new Subject<void>();

	constructor(
		private _service: MainService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _notificationService: NotificationService
	) {

		/**
		 * Min length of the first valid currency code
		 */
		const minLengthRef = VALID_CURRENCY_CODES.at(0)?.currencyCode?.length;

		const minAndMaxLength = VALID_CURRENCY_CODES
			.map(c => c.currencyCode)
			.reduce((minAndMax, code) => {

				if (code.length > minAndMax.max) {
					minAndMax.max = code.length;
				}

				if (code.length < minAndMax.min) {
					minAndMax.min = code.length;
				}

				return minAndMax;
			}, { min: minLengthRef ?? 0, max: 0 });

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
						.some(c => c.currencyCode == currencyCode);

					// Unknown or invalid currency code
					if (!isCurrencyCodeValid) {

						this._notificationService.message(`Unknown currency code!`);

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
					return this._service.fetchCurrentExchangeRate(currencyCode, 'BRL')
						.pipe(
							catchError(err => {
								// this._updateCurrencyCodeQueryParam(null);
								throw err;
							})
						);
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

		if (typeof fromSymbol == 'string' && fromSymbol.length == 0) {

			this._updateCurrencyCodeQueryParam(null);
			return;
		}

		if (!fromSymbol) {

			this._notificationService.message(`Invalid currency control!`);
			return;
		}

		if (!VALID_CURRENCY_CODES.some(c => c.currencyCode.toUpperCase() == fromSymbol.toUpperCase())) {

			this._notificationService.message(`Currency code not found!`);
			return;
		}

		// Check if is in uppercase
		if (fromSymbol.toUpperCase() != fromSymbol) {

			const fromSymbolUppercase = fromSymbol.toUpperCase();

			this._notificationService
				.confirm(`We found the "${fromSymbolUppercase}" and you provided "${fromSymbol}". Its this the desired code?`)
				.subscribe(res => {

					if (res) {

						this.currencyCodeControl.patchValue(fromSymbolUppercase);
						this._updateCurrencyCodeQueryParam(fromSymbolUppercase);
					} else {

						this._notificationService.message(`Invalid currency code!`);
					}
				});

			return;
		}

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
