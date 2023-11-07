import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { AppComponent } from "app/app.component";
import { appRoutes } from "app/routes/routes";

bootstrapApplication(AppComponent, {
	providers: [
		/**
		 * App routes
		 */
		provideRouter(appRoutes),

		/**
		 * Browser animation dependencies
		 */
		provideAnimations(),
	]
})
.catch(err => console.error(err));
