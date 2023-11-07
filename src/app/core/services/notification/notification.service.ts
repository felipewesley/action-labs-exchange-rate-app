import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Observable, of, take } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(
		// private _snackBar: MatSnackBar
	) { }

	/**
	 * Displays a confirmation message to the user
	 * @param message
	 */
	public confirm(message: string): Observable<boolean>;
	public confirm(message: string): Observable<boolean> {

		const confirmation = confirm(message);

		return of(confirmation)
			.pipe(
				take(1)
			);
	}

	/**
	 * Displays a message to the user
	 * @param message
	 */
	public message(message: string): void;
	public message(message: string): void {

		alert(message);
	}
}
