import { PAYSTACK_SK_LIVE, PAYSTACK_SK_TEST } from '$env/static/private';
import { subscribe } from '$lib/util/post/subscribe';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

const key = (domain: string) => (domain === 'live' ? PAYSTACK_SK_LIVE : PAYSTACK_SK_TEST);

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    console.log('/paystack', body)
	const hash = crypto
		.createHmac('sha512', key(body.data.domain))
		.update(JSON.stringify(body))
		.digest('hex');
	if (hash == request.headers.get('x-paystack-signature')) {
		switch (body.event) {
			case 'charge.success':
				if (body.data.status === 'success') {
					switch (body.data.metadata.purpose) {
						case 'post_subscription':
							await subscribe(body.data.customer.email, body.data.metadata.id);
					}
				}
		}
	}
	return new Response(null, { status: 200 });
};
