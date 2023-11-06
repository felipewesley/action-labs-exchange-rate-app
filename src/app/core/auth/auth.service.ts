import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private readonly _apiKey = new BehaviorSubject<string>('abc123');

	constructor() { }

	/**
	 * Adds the `API Key` header in the HTTP request and returns the updated headers
	 * @param headers The original headers
	 */
	public addApiKeyToRequestHeaders<T>(headers: HttpHeaders): HttpHeaders;
	public addApiKeyToRequestHeaders<T>(headers: HttpHeaders): HttpHeaders {

		const apiKey = this._apiKey.getValue();

		return headers.set('apiKey', apiKey);
	}
}
