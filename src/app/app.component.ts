import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	standalone: true,
	imports: [
		RouterOutlet,
		LayoutComponent
	]
})
export class AppComponent {
  title = 'action-labs-exchange-rate-app';
}
