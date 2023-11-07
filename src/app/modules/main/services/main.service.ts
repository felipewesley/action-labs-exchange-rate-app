import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";

import { BehaviorSubject, Observable, delay, finalize, map, of, take, tap } from "rxjs";

import { DailyExchangeRateModel } from "app/domain/models/daily-exchange-rate.model";
import { CurrentExchangeRateModel } from "app/domain/models/current-exchange-rate.model";

@Injectable()
export class MainService {

	private readonly _currentExchangeRate = new BehaviorSubject<CurrentExchangeRateModel>(null);
	private readonly _dailyExchangeRate = new BehaviorSubject<DailyExchangeRateModel>(null);

	private readonly _loading = new BehaviorSubject<boolean>(false);

	public readonly currentExchangeRate$ = this._currentExchangeRate.asObservable()
		.pipe(
			tap(() => {
				// Resets the daily exchange rate when the current exchanged is updated
				// this._dailyExchangeRate.next(null);
			})
		);
	public readonly dailyExchangeRate$ = this._dailyExchangeRate.asObservable();

	public readonly loading$ = this._loading.asObservable();

	constructor(
		private _http: HttpClient
	) { }

	/**
	 * Removes the current exchange data from the subject
	 */
	public clearCurrentExchangeRate(): void;
	public clearCurrentExchangeRate(): void {
		this._currentExchangeRate.next(null);
	}

	/**
	 * Fetches the current exchange rate from the api and updates its subject
	 * @param fromSymbol
	 * @param toSymbol
	 */
	public fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<void>;
	public fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<void> {

		this._loading.next(true);

		return this._fetchCurrentExchangeRate(fromSymbol, toSymbol)
			.pipe(
				finalize(() => this._loading.next(false)),
				map(currentExchangeRate => {
					this._currentExchangeRate.next(currentExchangeRate);

					// Init daily exchanges rate with emtpy data
					this._dailyExchangeRate.next({
						from: currentExchangeRate.fromSymbol,
						to: currentExchangeRate.toSymbol,
						data: [],
						lastUpdatedAt: currentExchangeRate.lastUpdatedAt,
						rateLimitExceeded: currentExchangeRate.rateLimitExceeded,
						success: currentExchangeRate.success
					});
				})
			);
	}

	/**
	 * Fetches the daily exchange rate from the api and updates its subject
	 * @param fromSymbol
	 * @param toSymbol
	 */
	public fetchDailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<void>;
	public fetchDailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<void> {

		this._loading.next(true);

		return this._fetchDailyExchangeRate(fromSymbol, toSymbol)
			.pipe(
				finalize(() => this._loading.next(false)),
				map(dailyExchangeRate => {
					this._dailyExchangeRate.next(dailyExchangeRate);
				})
			);
	}

	private _fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<CurrentExchangeRateModel> {

		const url = `${environment.api.baseUrl}${environment.api.currentExchangeRate}`;

		const params = {
			from_symbol: fromSymbol,
			to_symbol: toSymbol,
		};

		return of(<CurrentExchangeRateModel>{
			exchangeRate: 5,
			fromSymbol: fromSymbol,
			lastUpdatedAt: new Date(),
			rateLimitExceeded: false,
			success: true,
			toSymbol: toSymbol
		})
		.pipe(
			delay(3000)
		);

		return this._http.get<CurrentExchangeRateModel>(url, { params })
			.pipe(
				take(1)
			);
	}

	private _fetchDailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<DailyExchangeRateModel> {

		const url = `${environment.api.baseUrl}${environment.api.dailyExchangeRate}`;

		const params = {
			from_symbol: fromSymbol,
			to_symbol: toSymbol,
		};

		return of(<DailyExchangeRateModel>{
			data: [] ?? [
				{
					close: 5.0038,
					date: new Date(2022, 2, 9),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 7),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 6),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 5),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 4),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 3),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 2, 2),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 1, 28),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 1, 27),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 1, 26),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
				{
					close: 5.0038,
					date: new Date(2022, 1, 25),
					high: 5.0689,
					low: 4.9836,
					open: 5.0666,
				},
			],
			from: fromSymbol,
			lastUpdatedAt: new Date(),
			rateLimitExceeded: false,
			success: true,
			to: toSymbol
		})
		.pipe(
			delay(3000)
		);

		return this._http.get<DailyExchangeRateModel>(url, { params })
			.pipe(
				take(1)
			);
	}
}
