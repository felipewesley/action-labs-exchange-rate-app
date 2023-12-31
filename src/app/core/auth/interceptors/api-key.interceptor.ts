import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

/**
 * API key HTTP interceptor function
 * @param req
 * @param next
 * @returns
 */
export function apiKeyInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const authService = inject(AuthService);

	const params = authService.addApiKeyToRequestQueryParams(req.params);

	return next(req.clone({ params }));
}
