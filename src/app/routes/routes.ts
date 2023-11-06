import { Routes } from "@angular/router";

export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('app/modules/main/main.component').then(c => c.MainComponent)
	}
];
