import { client } from '$lib/util/redis';
import { update } from '$lib/util/redis/update';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// TODO! Authorization
	const { email, data } = await request.json();
	// TODO! validation, scrutinize
    await client.json.set(email, '$.payout', data).catch((e) => {
        console.log(e)
		throw error(500);
	});
	return new Response(null, { status: 202 });
};
