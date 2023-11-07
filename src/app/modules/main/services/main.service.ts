import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";

import { BehaviorSubject, Observable, delay, finalize, map, take } from "rxjs";

import { DailyExchangeRateModel } from "app/domain/models/daily-exchange-rate.model";
import { CurrentExchangeRateModel } from "app/domain/models/current-exchange-rate.model";

@Injectable()
export class MainService {

	private readonly _currentExchangeRate = new BehaviorSubject<CurrentExchangeRateModel>(null);
	private readonly _dailyExchangeRate = new BehaviorSubject<DailyExchangeRateModel>(null);

	private readonly _loading = new BehaviorSubject<boolean>(false);

	public readonly currentExchangeRate$ = this._currentExchangeRate.asObservable();
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
	 * Removes the daily exchange data from the subject
	 */
	public clearDailyExchangeRate(): void;
	public clearDailyExchangeRate(): void {
		this._dailyExchangeRate.next(null);
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

		return this._http.get<CurrentExchangeRateModel>(url, { params })
			.pipe(
				take(1),
				delay(3000),
			);
	}

	private _fetchDailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<DailyExchangeRateModel> {

		const url = `${environment.api.baseUrl}${environment.api.dailyExchangeRate}`;

		const params = {
			from_symbol: fromSymbol,
			to_symbol: toSymbol,
		};

		return this._http.get<DailyExchangeRateModel>(url, { params })
			.pipe(
				take(1),
				delay(3000),
			);
	}
}
