import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";

import { AppComponent } from "app/app.component";
import { appRoutes } from "app/routes/routes";

bootstrapApplication(AppComponent, {
	providers: [
		/**
		 * App routes
		 */
		provideRouter(appRoutes)
	]
})
.catch(err => console.error(err));
