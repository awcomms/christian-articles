import type { ChargeSuccess } from '$lib/types/paystack';
import { record_payment, type Args } from '$lib/util/redis/post/record_payment';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { data }: ChargeSuccess<{ args: Pick<Args, 'id' | 'amount' | 'once'> }> =
		await request.json();
	if (request.referrer.match(/^https:\/\/(?:[a-zA-Z0-9-]+\.)*apexlinks\.org/))
		await record_payment({
			...data.metadata.args,
			email: data.customer.email,
			date: new Date(data.paid_at).valueOf()
		});
	return new Response(null, { status: 200 });
};
