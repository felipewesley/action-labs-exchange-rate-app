import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { AppComponent } from "app/app.component";

import { appRoutes } from "app/routes/routes";
import { apiKeyInterceptorFn } from "app/core/auth/interceptors/api-key.interceptor";

bootstrapApplication(AppComponent, {
	providers: [
		/**
		 * App routes
		 */
		provideRouter(appRoutes),

		/**
		 * HTTP Client
		 */
		provideHttpClient(withInterceptors([
			apiKeyInterceptorFn
		])),

		/**
		 * Browser animation dependencies
		 */
		provideAnimations(),
	]
})
.catch(err => console.error(err));
