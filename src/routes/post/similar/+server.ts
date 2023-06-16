import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { similar } from '$lib/util/redis/post/similar';

export const POST: RequestHandler = async ({ request }) => {
	const args = await request.json();
	return json(await similar(args));
};
