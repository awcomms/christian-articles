import { paystack } from '$lib/util/paystack';
import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { record_payment, type Args } from '$lib/util/redis/post/record_payment';
import type { VerificationResponse } from '$lib/util/paystack/types';

export const GET: RequestHandler = async ({ params }) => {
	const { data } = await paystack
		.get<VerificationResponse<Args>>(`/verify/${params.reference}`)
		.catch((e) => {
			console.log('paystack payment verification request error', e);
			throw error(500, 'We experienced an error trying to verify your payment');
		});
	if (data.status) {
		if (data.data.status === 'success') {
			await record_payment({
				...data.data.metadata,
				cost: data.data.amount,
				email: data.data.customer.email,
				date: new Date(data.data.paid_at).valueOf()
			});
			return text('1');
		} else {
			return text('');
		}
	} else {
		console.log('paystack payment verification status: false', data);
		throw error(500, 'The response from our payment provider was not successful'); //TODO
	}
};
