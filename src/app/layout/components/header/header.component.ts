import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	standalone: true,
})
export class LayoutHeaderComponent implements OnInit {

	/**
	 * Application title
	 */
	@Input('title') public title: string;

	constructor() { }

	ngOnInit(): void {

	}
}
