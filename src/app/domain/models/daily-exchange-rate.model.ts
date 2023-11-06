/**
 * @interface
 */
export interface DailyExchangeRateModel {
	data: DailyExchangeRateDataModel[];
	from: string;
	lastUpdatedAt: Date;
	rateLimitExceeded: boolean;
	success: boolean;
	to: string;
}

/**
 * @interface
 */
export interface DailyExchangeRateDataModel {
	close: number;
	date: Date;
	high: number;
	low: number;
	open: number;
}
