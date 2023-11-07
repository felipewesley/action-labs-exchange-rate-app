// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,

	api: {
		// baseUrl							: 'https://api-brl-exchange.actionlabs.com.br/api/1.0',
		// currentExchangeRate	: '/open/currentExchangeRate',
		// dailyExchangeRate		: '/open/dailyExchangeRate',

		baseUrl							: '.',
		currentExchangeRate	: '/assets/api/currentExchangeRate.json',
		dailyExchangeRate		: '/assets/api/dailyExchangeRate.json',
	},

	keys: {
		api: 'RVZG0GHEV2KORLNA'
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
