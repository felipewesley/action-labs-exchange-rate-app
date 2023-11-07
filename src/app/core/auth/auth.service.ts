import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { environment } from "environments/environment";

import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private readonly _apiKey = new BehaviorSubject<string>(environment.keys.api);

	constructor() { }

	/**
	 * Adds the `API Key` param in the HTTP request and returns the updated params
	 * @param params The original params
	 */
	public addApiKeyToRequestQueryParams(params: HttpParams): HttpParams;
	public addApiKeyToRequestQueryParams(params: HttpParams): HttpParams {

		const apiKey = this._apiKey.getValue();

		return params.set('apiKey', apiKey);
	}
}
