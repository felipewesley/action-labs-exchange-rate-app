export type ValidCurrencyCodeItem = {
	currencyCode: string;
	description: string;
	symbol: string;
};

/**
 * List of all valid and accepted currency codes
 * @constant VALID_CURRENCY_CODES
 */
export const VALID_CURRENCY_CODES: ValidCurrencyCodeItem[] = [
	{
		currencyCode: 'BRL',
		description: 'Brazilian real',
		symbol: 'BRL'
	},
	{
		currencyCode: 'USD',
		description: 'US dollar',
		symbol: 'USD'
	},
	{
		currencyCode: 'GBP',
		description: 'British pounds',
		symbol: 'GBP'
	},
	{
		currencyCode: 'JPY',
		description: 'Japanese yen',
		symbol: 'JPY'
	},
	{
		currencyCode: 'CAD',
		description: 'Canadian dollar',
		symbol: 'CAD'
	},
];
