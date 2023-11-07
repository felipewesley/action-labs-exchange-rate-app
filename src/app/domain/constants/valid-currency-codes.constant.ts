import { IKeyValuePair } from "app/common/types/key-value-pair";

/**
 * List of all valid and accepted currency codes
 * @constant VALID_CURRENCY_CODES
 */
export const VALID_CURRENCY_CODES: IKeyValuePair<string, string>[] = [
	{
		key: 'BRL',
		value: 'Brazilian real'
	},
	{
		key: 'USD',
		value: 'US dollar',
	},
	{
		key: 'GBP',
		value: 'British pounds'
	},
	{
		key: 'JPY',
		value: 'Japanese yen'
	},
	{
		key: 'CAD',
		value: 'Canadian dollar'
	},
];
