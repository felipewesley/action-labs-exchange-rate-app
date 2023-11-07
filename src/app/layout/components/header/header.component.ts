import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
})
export class LayoutHeaderComponent implements OnInit {

	/**
	 * Application title
	 */
	@Input('title') public title: string;

	/**
	 * Application logo url
	 */
	@Input('logoUrl') public logoUrl: string;

	constructor() { }

	ngOnInit(): void {

	}
}
