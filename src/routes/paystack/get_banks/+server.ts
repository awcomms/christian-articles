import { currencies, type Currency } from '$lib/util/paystack/currencies';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { get_banks } from '$lib/util/paystack/get_banks';

export const GET: RequestHandler = async ({ url }) => {
	const currency = url.searchParams.get('currency');
	if (!currency) throw error(400, 'No currency specified in request');
	if (!currencies.find((c) => c.value === currency))
		throw error(400, 'Unsupported currency specified in request');
	const banks = await get_banks(currency as Currency).catch((e) => {
		console.error(`get_banks(${currency}) error: ${e}`);
		throw error(500, 'Encountered an error attempting to get list of banks');
	});
	return json(banks);
};
