import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { appConfig } from "app/config/app.config";

import { LayoutHeaderComponent } from "./components/header/header.component";
import { LayoutFooterComponent } from "./components/footer/footer.component";

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		LayoutHeaderComponent,
		LayoutFooterComponent,
	]
})
export class LayoutComponent implements OnInit {

	public readonly appTitle = appConfig.appTitle;
	public readonly companyName = appConfig.companyName;

	constructor() { }

	ngOnInit(): void {

	}
}
