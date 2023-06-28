export const currencies: Array<{ name: string; value: Currency }> = [
	{ name: 'Naira', value: 'NGN' },
	{ name: 'Cedi', value: 'GHS' }
];

export type Currency = 'NGN' | 'GHS';
