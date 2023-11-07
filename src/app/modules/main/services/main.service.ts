import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "environments/environment";

import { BehaviorSubject, Observable, map, take } from "rxjs";

import { DailyExchangeRateModel } from "app/domain/models/daily-exchange-rate.model";
import { CurrentExchangeRateModel } from "app/domain/models/current-exchange-rate.model";

@Injectable()
export class MainService {

	private readonly _currentExchangeRate = new BehaviorSubject<CurrentExchangeRateModel>(null);
	private readonly _dailyExchangeRate = new BehaviorSubject<DailyExchangeRateModel>(null);

	public readonly currentExchangeRate$ = this._currentExchangeRate.asObservable();
	public readonly dailyExchangeRate$ = this._dailyExchangeRate.asObservable();

	constructor(
		private _http: HttpClient
	) { }

	/**
	 * Fetches the current exchange rate from the api and updates its subject
	 * @param fromSymbol
	 * @param toSymbol
	 */
	public fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<void>;
	public fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<void> {

		return this._fetchCurrentExchangeRate(fromSymbol, toSymbol)
			.pipe(
				map(currentExchangeRate => {
					this._currentExchangeRate.next(currentExchangeRate);
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

		return this._fetchDailyExchangeRate(fromSymbol, toSymbol)
			.pipe(
				map(dailyExchangeRate => {
					this._dailyExchangeRate.next(dailyExchangeRate);
				})
			);
	}

	private _fetchCurrentExchangeRate(fromSymbol: string, toSymbol: string): Observable<CurrentExchangeRateModel> {

		const url = `${environment.api.baseUrl}${environment.api.currentExchangeRate}`;

		const params = {
			from_symbol: fromSymbol,
			to_symbol: toSymbol
		};

		return this._http.get<CurrentExchangeRateModel>(url, { params })
			.pipe(
				take(1)
			);
	}

	private _fetchDailyExchangeRate(fromSymbol: string, toSymbol: string): Observable<DailyExchangeRateModel> {

		const url = `${environment.api.baseUrl}${environment.api.dailyExchangeRate}`;

		const params = {
			from_symbol: fromSymbol,
			to_symbol: toSymbol
		};

		return this._http.get<DailyExchangeRateModel>(url, { params })
			.pipe(
				take(1)
			);
	}
}
