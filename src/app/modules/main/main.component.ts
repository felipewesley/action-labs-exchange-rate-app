import { Component, OnInit } from "@angular/core";

import { MainService } from "./services/main.service";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	standalone: true,
	providers: [
		MainService
	]
})
export class MainComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {

	}
}
