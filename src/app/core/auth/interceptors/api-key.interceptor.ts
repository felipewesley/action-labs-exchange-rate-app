import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	constructor(
		private _authService: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const headers = this._authService.addApiKeyToRequestHeaders(req.headers);

		return next.handle(req.clone({ headers }));
	}
}
