import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';

import { environment } from 'environments/environment';

import { Observable, of, switchMap, throwError } from 'rxjs';

/**
 * Error interceptor
 * @param req
 * @param next
 * @returns
 */
export function errorInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	return next(req)
		.pipe(
			switchMap(res => {

				/**
				 * Checks if the event is the HTTP response
				 */
				if (res instanceof HttpResponse) {

					const isApiTheRequestTarget = req.url.includes(environment.api.baseUrl);

					if (isApiTheRequestTarget) {

						type ExpectedApiResponseType = {
							rateLimitExceeded: boolean;
							success: boolean;
						};

						const typedResponse = res as unknown as HttpResponse<ExpectedApiResponseType>;

						/**
						 * Checks for success field
						 */
						const success = typedResponse?.body?.success;

						if (!success) {
							return throwError(() => new Error(`The request was not completed successfully!`));
						}

						/**
						 * Checks for rate limit field
						 */
						const rateLimitExceeded = typedResponse?.body?.rateLimitExceeded;

						if (rateLimitExceeded) {
							return throwError(() => new Error(`API call limit reached!`));
						}
					}
				}

				return of(res);

			})
		);
}
