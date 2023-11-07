import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

@Component({
	selector: 'app-layout-footer',
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
