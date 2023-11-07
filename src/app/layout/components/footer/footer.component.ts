import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-layout-footer',
	templateUrl: './footer.component.html',
	standalone: true,
	imports: [
		NgIf
	]
})
export class LayoutFooterComponent implements OnInit {

	/**
	 * Company name
	 */
	@Input('companyName') public companyName: string;

	public readonly currentYear = (new Date()).getFullYear();

	constructor() { }

	ngOnInit(): void {

	}
}
